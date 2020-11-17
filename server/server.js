const mongoose = require('mongoose');
const signale = require('signale');

const app = require('./app');

app.listen(process.env.PORT, () => signale.success(`server started ${process.env.PORT}`));

mongoose.connect(process.env.MONGO_DB_URL, ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}))
  .then(() => signale.success('mongoDB connected'))
  .catch(err => signale.error(err));
