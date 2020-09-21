const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  body: String,
  status: Schema.Types.Boolean
});

module.exports = mongoose.model('Task', taskSchema);
