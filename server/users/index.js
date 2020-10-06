const { Router } = require('express');

const { logIn, signUp, forgotPassword } = require('./user.controller');

const router = Router();

router.post('/auth/signup', signUp);
router.post('/auth/login', logIn);
router.post('/auth/password', forgotPassword);

module.exports = router;
