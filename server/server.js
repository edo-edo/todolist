import React from 'react';
import App from '../client/App';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const signale = require('signale');
const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');

require('dotenv').config();

const taskRouter = require('./tasks');
const authRouter = require('./auth');

const app = express();

app.get('/', (req, res) => {
  const application = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${application}</div>`)
    );
  });
});

app.use(express.static('./build'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

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
