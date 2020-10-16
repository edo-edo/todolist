const { Router } = require('express');

require('./auth.service');

const {
  logIn,
  signUp,
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
} = require('./auth.controller');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.get('/signup/google', signUpGoogle);
router.get('/login/google', loginGoogle);
router.get('/signup/facebook', signUpFacebook);
router.get('/login/facebook', logInFacebook);
router.get('/signup/facebook/callback', signUpFacebookRedirect);
router.get('/login/facebook/callback', logInFacebookRedirect);
router.get('/signup/google/callback', signUpGoogleRedirect);
router.get('/login/google/callback', logInGoogleRedirect);

module.exports = router;
