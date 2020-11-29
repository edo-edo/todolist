const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../users/user.modal');
const userValidation = require('../users/user.validation');
const { OAuth2SignUpCallback, OAuth2LogInCallback } = require('./auth.service');

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
        const { error } = await userValidation.validate(req.body);
        if (error) {
          return done(null, false, { message: error.details[0].message });
        }

        const user = await User.findOne({ email });

        if (user) {
          return done(null, false, { message: `${email} already exists` });
        }

        const newUser = await User({
          firstName,
          lastName,
          email,
          password,
          provider: 'website'
        }).save();

        return done(null, newUser, { message: 'User is added successfully' });
      } catch (err) {
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
        await user.isValidPassword(password, (error, isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: 'Wrong Password' });
          }
          return done(null, user, { message: 'Logged in Successfully' });
        });
        return false;
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
    callbackURL: '/api/auth/signup/google/callback'
  }, (OAuth2SignUpCallback))
);

passport.use(
  'googleLogin',
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/login/google/callback'
  }, (OAuth2LogInCallback))
);

passport.use(
  'facebookSignUp',
  new FacebookStrategy({
    clientID: process.env.FACABOOK_APP_ID,
    clientSecret: process.env.FACABOOK_APP_SECRET,
    callbackURL: '/api/auth/signup/facebook/callback',
    profileFields: ['displayName', 'name', 'emails']
  }, (OAuth2SignUpCallback))
);

passport.use(
  'facebookLogIn',
  new FacebookStrategy({
    clientID: process.env.FACABOOK_APP_ID,
    clientSecret: process.env.FACABOOK_APP_SECRET,
    callbackURL: '/api/auth/login/facebook/callback',
    profileFields: ['displayName', 'name', 'emails']
  }, (OAuth2LogInCallback))
);
