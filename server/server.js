const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const signale = require('signale');
const path = require('path');

require('dotenv').config();

const taskRouter = require('./tasks');
const authRouter = require('./auth');

const app = express();

app.use(express.static(`${__dirname}/../dist/index.html`));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());

app.use('/tasks', taskRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => signale.success(`server started ${process.env.PORT}`));

mongoose.connect(process.env.MONGO_DB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}))
  .then(() => signale.success('mongoDB connected'))
  .catch(err => signale.error(err));
