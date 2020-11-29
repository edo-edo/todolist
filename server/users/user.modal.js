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

async function preSave(next) {
  if (this.password) {
    bcrypt.genSalt(10, (err, salt) => {
      const hash = bcrypt.hashSync(this.password, salt);
      this.password = hash;
    });
  }

  next();
}

async function comparePass(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    return callback(null, isMatch);
  });
}

userSchema.methods.isValidPassword = comparePass;
userSchema.methods.preSave = preSave;

userSchema.pre('save', preSave);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
