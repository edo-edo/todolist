const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  provider: String,
  resetPassword: String
}, { timestamps: true });

userSchema.pre('save', async function save(next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

async function comparePass(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

userSchema.methods.isValidPassword = comparePass;

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
