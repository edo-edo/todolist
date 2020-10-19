const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
            password,
            provider: 'website'
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
        const user = await User.findOne({ email, provider: 'website' });

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
  'googleSignUp',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/signup/google/callback'
  }, (async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      await userValidation.validateAsync({
        firstName,
        lastName,
        email,
        provider: 'google'
      }, { abortEarly: false });

      const user = await User.findOne({ email });

      if (user) {
        return done(null, false, { message: `${email} already exists ` });
      }

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        provider: 'google'
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }))
);

passport.use(
  'googleLogin',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/login/google/callback'
  }, (async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;

      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found ' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }))
);

passport.use(
  'facebookSignUp',
  new FacebookStrategy({
    clientID: process.env.FACABOOK_APP_ID,
    clientSecret: process.env.FACABOOK_APP_SECRET,
    callbackURL: '/auth/signup/facebook/callback',
    profileFields: ['displayName', 'name', 'emails']
  }, (async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails[0].value) {
        return done(null, false, { message: 'You don\'t use email address on facebook ' });
      }

      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;

      await userValidation.validateAsync({
        firstName,
        lastName,
        email,
        provider: 'facebook'
      }, { abortEarly: false });

      const user = await User.findOne({ email });

      if (user) {
        return done(null, false, { message: `${email} already exists ` });
      }

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        provider: 'facebook'
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }))
);

passport.use(
  'facebookLogIn',
  new FacebookStrategy({
    clientID: process.env.FACABOOK_APP_ID,
    clientSecret: process.env.FACABOOK_APP_SECRET,
    callbackURL: '/auth/login/facebook/callback',
    profileFields: ['displayName', 'name', 'emails']
  }, (async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails[0].value) {
        return done(null, false, { message: 'You don\'t use email address on facebook ' });
      }

      const email = profile.emails[0].value;

      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found ' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
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
    <a href=http://localhost:3000/auth/reset-password?resetToken=${token}> reset password </a>`
  });

  return info;
};

module.exports = sendMail;
