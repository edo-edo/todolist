const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../users/user.modal');
const userValidation = require('../users/user.validation');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true

    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;
      try {
        await userValidation.validateAsync(req.body, { abortEarly: false });

        await User.findOne({ email }).then(async user => {
          if (user) {
            return done(null, false, { message: `${email} already exists ` });
          }

          const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
          });
          return done(null, newUser, { message: 'User is added successfully' });
        });
        return false;
      } catch (err) {
        if (err.isJoi) {
          return done(null, false, { message: err.details[0].message });
        }
        return done(err);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  'google',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, (async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    await User.findOne({ email }).then(async user => {
      if (!user) {
        return done(null, false, { message: `${email} already exists ` });
      }
      return done(null, email);
    });
  }))
);

const sendMail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAI,
    to: user.email,
    subject: 'reset password ✔',
    html: `<h1> Hello ${user.firstName} </h1>
    <p> If you requested to reset password please visit this link </p>
    <a href=http://localhost:3000/auth/reset-password?token=${token}> reset password </a>`
  });

  return info;
};

module.exports = sendMail;
