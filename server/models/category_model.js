const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
  productIds: {
    type: [Schema.Types.ObjectId],
    ref: 'product'
  }
});

mongoose.model('category', categorySchema);
