const Joi = require('joi');
const signale = require('signale');

const Task = require('./task.modal');
const taskValidation = require('./task.validation');

const getTasks = async (req, res) => {
  try {
    const { _id } = req.user;

    const tasks = await Task.find({ user: _id }, { body: 0, __v: 0 });
    return res.json({ tasks });
  } catch (err) {
    signale.fatal('Fatal: failed to get tasks');
    return res.status(500).send('failed to get tasks');
  }
};

const createTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, body, status } = req.body;

    await taskValidation.validateAsync(req.body, { abortEarly: false });

    const task = await Task.create({
      user: _id,
      title,
      body,
      status
    });

    return res.json({ id: task._id });
  } catch (err) {
    signale.fatal('Fatal: failed to create task');

    return res.status(500).send('failed to create task');
  }
};

const getTask = async (req, res) => {
  try {
    const { _id } = req.user;

    const task = await Task.findOne({ _id: req.params.id, user: _id }, { __v: 0 });
    if (!task) {
      return res.status(500).send('failed to get task');
    }
    return res.json({ task });
  } catch (err) {
    signale.fatal('Fatal: failed to get task');

    return res.status(500).send('failed to get task');
  }
};

const removeTask = async (req, res) => {
  try {
    const { _id } = req.user;

    const { deletedCount } = await Task.deleteOne({ _id: req.params.id, user: _id });

    if (deletedCount === 0) {
      return res.status(403).send('failed to delete task');
    }
    return res.json({ message: 'task deleted' });
  } catch (err) {
    signale.fatal('Fatal: failed to delete task');

    return res.status(500).send('failed to delete task');
  }
};

const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const { _id } = req.user;

    Joi.attempt(status, Joi.boolean());

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: _id },
      { status: !status }
    );
    if (!task) {
      return res.status(500).send('failed to update status');
    }

    return res.json({ message: 'status updated' });
  } catch (err) {
    signale.fatal('Fatal: failed to update status');

    return res.status(500).send('failed to update status');
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  removeTask,
  updateTask
};
