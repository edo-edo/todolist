const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const Task = require('./models/task');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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
    res.status(400).send('failed to get tasks');
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
    res.status(400).send('failed to create task');
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id }, { __v: 0 });
    res.json({ task });
  } catch (err) {
    res.status(400).send('failed to get task');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'task deleted' });
  } catch (err) {
    res.status(400).send('failed to delete task');
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    await Task.findOneAndUpdate({ _id: req.params.id }, { status: !req.body.status });
    res.json({ message: 'status updated' });
  } catch (err) {
    res.status(400).send('failed to update status');
  }
});

app.listen(process.env.PORT, () => console.log(`server started ${process.env.PORT}`));

mongoose.connect(process.env.MONGO_DB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}))
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
