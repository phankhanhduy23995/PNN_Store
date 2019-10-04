const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
  description: String,
  price: {
    type: Number,
    required: true
  },
  brand: String,
  size: String,
  color: String,
  quantity: String,
  image: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  }
});

mongoose.model('product', productSchema);
