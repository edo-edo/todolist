const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const Task = require('./models/task');
const User = require('./models/user');
const taskValidation = require('./models/validation/task-validation');
const userValidation = require('./models/validation/user-validation');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(passport.initialize());

require('./auth/auth');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  return next();
});
const authMiddware = passport.authenticate('jwt', { session: false });

app.get('/tasks', authMiddware, async (req, res) => {
  try {
    const tasks = await Task.find({}, { body: 0, __v: 0 });
    res.json({ tasks });
  } catch (err) {
    res.status(400).send('failed to get tasks');
  }
});

app.post('/tasks', authMiddware, async (req, res) => {
  try {
    const { title, body, status } = req.body;

    await taskValidation.validateAsync(req.body, { abortEarly: false });

    const task = await Task.create({ title, body, status });

    res.json({ id: task._id });
  } catch (err) {
    res.status(500).send('failed to create task');
  }
});

app.get('/tasks/:id', authMiddware, async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id }, { __v: 0 });

    res.json({ task });
  } catch (err) {
    res.status(500).send('failed to get task');
  }
});

app.delete('/tasks/:id', authMiddware, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });

    res.json({ message: 'task deleted' });
  } catch (err) {
    res.status(500).send('failed to delete task');
  }
});

app.put('/tasks/:id', authMiddware, async (req, res) => {
  try {
    const { status } = req.body;

    Joi.attempt(status, Joi.boolean());

    await Task.findOneAndUpdate({ _id: req.params.id }, { status: !status });

    res.json({ message: 'status updated' });
  } catch (err) {
    res.status(500).send('failed to update status');
  }
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true

    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;
      try {
        await userValidation.validateAsync(req.body, { abortEarly: false });

        await User.findOne({ email }).then(async user => {
          if (user) {
            return done(null, false, { message: `${email} already exists ` });
          }

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
              const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hash
              });

              return done(null, newUser, { message: 'User is added successfully' });
            });
          });

          return false;
        });
      } catch (err) {
        if (err.isJoi) {
          return done(null, false, { message: err.details[0].message });
        }
        return done(err);
      }
      return false;
    }
  )
);

app.post('/auth/signup', async (req, res, next) => {
  passport.authenticate('signup', async (err, user, info) => {
    try {
      if (!user) {
        return res.status(400).send(info.message);
      }

      req.logIn(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, firstName: user.firstName };
        const token = jwt.sign({ user: body }, process.env.SECRET_OR_KEY);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }

    return false;
  })(req, res, next);
});

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        });
      } catch (error) {
        return done(error);
      }
      return false;
    }
  )
);

app.post('/auth/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user) {
        return res.status(400).send(info.message);
      }

      req.login(user, { session: false }, async error => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, firstName: user.firstName };
        const token = jwt.sign({ user: body }, 'top_secret');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }

    return false;
  })(req, res, next);
});

app.listen(process.env.PORT, () => console.log(`server started ${process.env.PORT}`));

mongoose.connect(process.env.MONGO_DB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}))
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));
