const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  body: String,
  status: Schema.Types.Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
});

module.exports = mongoose.model('Task', taskSchema);
