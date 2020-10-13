const { Router } = require('express');

require('./auth.service');

const {
  logIn,
  signUp,
  forgotPassword,
  resetPassword,
  loginGoogle,
  loginGoogleRedirect
} = require('./auth.controller');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.get('/google', loginGoogle);
router.get('/google/callback', loginGoogleRedirect);

module.exports = router;
