const { Router } = require('express');
const passport = require('passport');
const {
  getTasks,
  createTask,
  getTask,
  removeTask,
  updateTask,
} = require('./task.controller');

require('../auth/middleware/check.auth');

const router = Router();

const authMiddware = passport.authenticate('jwt', { session: false });

router.get('/', authMiddware, getTasks);
router.post('/', authMiddware, createTask);
router.get('/:id', authMiddware, getTask);
router.delete('/:id', authMiddware, removeTask);
router.put('/:id', authMiddware, updateTask);

module.exports = router;
