const jwtDecode = require('jwt-decode');
const Joi = require('joi');

const Task = require('./task.modal');
const taskValidation = require('./task.validation');

const getUserId = req => {
  const decoded = jwtDecode(req.headers.authorization);
  return decoded.user._id;
};

const getTasks = async (req, res) => {
  try {
    const id = getUserId(req);

    const tasks = await Task.find({ user: id }, { body: 0, __v: 0 });
    return res.json({ tasks });
  } catch (err) {
    return res.status(500).send('failed to get tasks');
  }
};

const createTask = async (req, res) => {
  try {
    const _id = getUserId(req);
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
    return res.status(500).send('failed to create task');
  }
};

const getTask = async (req, res) => {
  try {
    const id = getUserId(req);

    const task = await Task.findOne({ _id: req.params.id, user: id }, { __v: 0 });
    if (!task) {
      return res.status(500).send('failed to get task');
    }
    return res.json({ task });
  } catch (err) {
    return res.status(500).send('failed to get task');
  }
};

const removeTask = async (req, res) => {
  try {
    const id = getUserId(req);

    const { deletedCount } = await Task.deleteOne({ _id: req.params.id, user: id });

    if (deletedCount === 0) {
      return res.status(403).send('failed to delete task');
    }
    return res.json({ message: 'task deleted' });
  } catch (err) {
    return res.status(500).send('failed to delete task');
  }
};

const updateTask = async (req, res) => {
  try {
    const { status } = req.body;
    const id = getUserId(req);

    Joi.attempt(status, Joi.boolean());

    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: id }, { status: !status });
    if (!task) {
      return res.status(500).send('failed to update status');
    }

    return res.json({ message: 'status updated' });
  } catch (err) {
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
