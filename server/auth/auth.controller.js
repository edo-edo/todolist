const passport = require('passport');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const signale = require('signale');

require('./auth.service');
const User = require('../users/user.modal');
const sendMail = require('./auth.service');

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
        const token = jwt.sign({ user: body }, process.env.JWT_KEY);

        return res.json({ token: `Bearer ${token}` });
      });
    } catch (error) {
      return next(error);
    }

    return false;
  })(req, res, next);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, process.env.JWT_KEY);

    await sendMail(user, token);

    const updateUser = await User.updateOne(
      { _id: user._id, email: user.email },
      { resetPassword: token }
    );

    if (updateUser.nModified === 1) {
      res.json({ message: 'send success' });
    }
  } catch (err) {
    signale.fatal('Error: can not send mail', err);

    res.status(400).send('Somthing went wrong');
  }

  return false;
};

const resetPassword = async (req, res) => {
  const { password, rePassword, token } = req.body;
  let decoded = null;

  if (password !== rePassword) {
    return res.status(400).send('Passwords must match');
  }
  Joi.attempt(password, Joi.string().required().min(6).regex(RegExp('^[a-zA-Z0-9]'))
    .message('You password is week'));

  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return res.status(400).send('Invalid token');
  }

  try {
    const { _id, email } = decoded.user;
    const hash = await bcrypt.hash(password, 10);

    const updateUser = await User.updateOne(
      { _id, email, resetPassword: token },
      { password: hash }
    );

    if (updateUser.nModified === 1) {
      const user = await User.findOne({ _id, email });
      const body = { _id: user._id, firstName: user.firstName };
      const newtoken = jwt.sign({ user: body }, process.env.JWT_KEY);

      return res.json({ token: `Bearer ${newtoken}` });
    }
    return res.status(400).send('failed to update password');
  } catch (err) {
    signale.fatal('Error:failed to update password', err);

    return res.status(400).send('failed to update password');
  }
};

module.exports = {
  signUp,
  logIn,
  forgotPassword,
  resetPassword
};
