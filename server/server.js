require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const signale = require('signale');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/webpack.dev');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());
const apiRouter = require('./routers');

app.use('/api', apiRouter);

const compiler = webpack(config);

app.use(webpackDevMiddleware(
  compiler,
  config.devServer
));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 2000
}));

const staticMiddleware = express.static('dist');

app.use(staticMiddleware);

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);

    return res.end();
  });
});

app.listen(process.env.PORT, () => signale.success(`server started ${process.env.PORT}`));

mongoose.connect(process.env.MONGO_DB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}))
  .then(() => signale.success('mongoDB connected'))
  .catch(err => signale.error(err));

module.export = app;
