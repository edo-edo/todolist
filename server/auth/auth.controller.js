const passport = require('passport');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const signale = require('signale');

const User = require('../users/user.modal');
const { sendMail } = require('./auth.service');

require('./auth.passport');

const sendResponseOAuth2 = async (req, res, next, err, user, info, errType) => {
  if (!user || err) {
    return res.redirect(`/?${errType}=${info.message}`);
  }

  req.login(user, { session: false }, async error => {
    if (error) {
      return next(error);
    }

    const body = { _id: user._id, firstName: user.firstName };
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        user: body
      }, process.env.JWT_KEY
    );

    return res.redirect(`/?token=${token}`);
  });
  return false;
};

const sendResponseLocalStrategy = async (req, res, next, err, user, info) => {
  if (err) {
    return res.status(400).send('Something went wrong');
  }

  if (!user) {
    return res.status(400).send(info.message);
  }

  req.login(user, { session: false }, async error => {
    if (error) {
      return next(error);
    }

    const body = { _id: user._id, firstName: user.firstName };
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        user: body
      }, process.env.JWT_KEY
    );

    return res.json({ token: `Bearer ${token}` });
  });
  return false;
};

const signUp = async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      return sendResponseLocalStrategy(req, res, next, err, user, info);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const logIn = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      return sendResponseLocalStrategy(req, res, next, err, user, info);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const signUpGoogle = passport.authenticate('googleSignUp', {
  scope: ['profile', 'email']
});

const loginGoogle = passport.authenticate('googleLogin', {
  scope: ['profile', 'email']
});

const logInGoogleRedirect = async (req, res, next) => {
  passport.authenticate('googleLogin', async (err, user, info) => {
    try {
      return sendResponseOAuth2(req, res, next, err, user, info, 'logInError');
    } catch (error) {
      signale.fatal('Error: Log in google user', error);

      return next(error);
    }
  })(req, res, next);
};

const signUpGoogleRedirect = async (req, res, next) => {
  passport.authenticate('googleSignUp', async (err, user, info) => {
    try {
      return sendResponseOAuth2(req, res, next, err, user, info, 'signUpError');
    } catch (error) {
      signale.fatal('Error: Sign Up google user', error);

      return next(error);
    }
  })(req, res, next);
};

const signUpFacebook = passport.authenticate('facebookSignUp', { scope: ['email'] });

const logInFacebook = passport.authenticate('facebookLogIn', { scope: ['email'] });

const logInFacebookRedirect = async (req, res, next) => {
  passport.authenticate('facebookLogIn', async (err, user, info) => {
    try {
      return sendResponseOAuth2(req, res, next, err, user, info, 'logInError');
    } catch (error) {
      signale.fatal('Error: Log In facebook user', error);

      return next(error);
    }
  })(req, res, next);
};

const signUpFacebookRedirect = async (req, res, next) => {
  passport.authenticate('facebookSignUp', async (err, user, info) => {
    try {
      return sendResponseOAuth2(req, res, next, err, user, info, 'signUpError');
    } catch (error) {
      signale.fatal('Error: Sign Up facebook user', error);

      return next(error);
    }
  })(req, res, next);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email, provider: 'website' });

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

  try {
    Joi.attempt(password, Joi.string().min(6).regex(RegExp('^[a-zA-Z0-9]*$'))
      .message('You password is week'));
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

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
  resetPassword,
  signUpGoogle,
  loginGoogle,
  signUpGoogleRedirect,
  logInGoogleRedirect,
  signUpFacebook,
  logInFacebook,
  signUpFacebookRedirect,
  logInFacebookRedirect
};
