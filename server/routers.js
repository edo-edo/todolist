const { Router } = require('express');

const taskRouter = require('./tasks');
const authRouter = require('./auth');

const router = Router();

router.use('/tasks', taskRouter);
router.use('/auth', authRouter);

module.exports = router;
