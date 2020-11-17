require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
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

module.exports = app;
