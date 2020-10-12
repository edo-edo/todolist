const { Router } = require('express');

const {
  logIn,
  signUp,
  forgotPassword,
  resetPassword,
  loginGoogle
} = require('./auth.controller');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);
router.get('/google', loginGoogle);

module.exports = router;
