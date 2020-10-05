const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./user.modal');
const userValidation = require('./user.validation');

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
