const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Task = require('./models/task');

const app = express();
app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.mongoDB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
}))
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.proxy_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  return next();
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({}, { body: 0, __v: 0 });
    res.json({ tasks });
  } catch (err) {
    res.status(400).send({ message: 'failed to get tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
    });
    res.json({ id: task._id });
  } catch (err) {
    res.status(400).send({ message: 'failed to create task' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id }, { __v: 0 });
    res.json({ task });
  } catch (err) {
    res.status(400).send({ message: 'failed to get tasks' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ message: 'task deleted' });
  } catch (err) {
    res.status(400).send({ message: 'failed to delete task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndUpdate({ _id: req.params.id }, { status: !req.body.status });
    res.json({ message: 'status updated' });
  } catch (err) {
    res.status(400).send({ message: 'failed to update status' });
  }
});

app.listen(process.env.Port, () => console.log(`server started ${process.env.Port}`));
