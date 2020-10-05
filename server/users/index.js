const { Router } = require('express');

const { logIn, signUp } = require('./user.controller');

const router = Router();

router.post('/auth/signup', signUp);
router.post('/auth/login', logIn);

module.exports = router;
