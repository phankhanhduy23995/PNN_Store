const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  }
});

mongoose.model('role', roleSchema);
