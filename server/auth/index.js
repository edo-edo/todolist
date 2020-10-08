const { Router } = require('express');

const {
  logIn,
  signUp,
  forgotPassword,
  resetPassword
} = require('./auth.controller');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);

module.exports = router;
