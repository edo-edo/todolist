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
    signale.fatal('Fatal: failed to get tasks', err);

    return res.status(500).send('failed to get tasks');
  }
};

const createTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, body, status } = req.body;

    const { error } = await taskValidation.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const task = await Task.create({
      user: _id,
      title,
      body,
      status
    });

    return res.json({ id: task._id });
  } catch (err) {
    signale.fatal('Fatal: failed to create task', err);

    return res.status(500).send('failed to create task');
  }
};

const getTask = async (req, res) => {
  try {
    const { _id } = req.user;

    const task = await Task.findOne({ _id: req.params.id, user: _id }, { __v: 0 });

    if (task) {
      return res.json({ task });
    }

    return res.status(403).send('failed to get task');
  } catch (err) {
    signale.fatal('Fatal: failed to get task', err);

    return res.status(500).send('failed to get task');
  }
};

const removeTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { deletedCount } = await Task.deleteOne({ _id: req.params.id, user: _id });

    if (deletedCount === 1) {
      return res.json({ message: 'task deleted' });
    }

    return res.status(403).send('failed to delete task');
  } catch (err) {
    signale.fatal('Fatal: failed to delete task', err);

    return res.status(500).send('failed to delete task');
  }
};

const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const { _id } = req.user;

    try {
      Joi.attempt(status, Joi.boolean(), { convert: false });
    } catch (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { nModified } = await Task.updateOne(
      { _id: req.params.id, user: _id },
      { status: !status }
    );

    if (nModified === 1) {
      return res.json({ message: 'status updated' });
    }

    return res.status(403).send('Failed to update status');
  } catch (err) {
    signale.fatal('Fatal: failed to update status', err);

    return res.status(500).send('Failed to update status');
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  removeTask,
  updateTask
};
