const passport = require('passport');
const jwt = require('jsonwebtoken');

require('./user.service');

const signUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if (!user || err) {
        return res.status(400).send(info.message);
      }

      req.logIn(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, firstName: user.firstName };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY);

        return res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      return next(error);
    }

    return false;
  })(req, res, next);
};

const logIn = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user || err) {
        return res.status(400).send(info.message);
      }

      req.login(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, firstName: user.firstName };
        const token = jwt.sign({ user: body }, 'top_secret');

        return res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      return next(error);
    }

    return false;
  })(req, res, next);
};

module.exports = {
  signUp,
  logIn
};
