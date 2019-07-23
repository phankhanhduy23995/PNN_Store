const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  created_at: {
    type: Date
  },
  updated_at: Date
});

mongoose.model('role', roleSchema);
