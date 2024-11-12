const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product',  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],
 

  billingAddress: {
    name: String,
    email: String,
    phone: Number,
    street1: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  orderStatus: {
    type: String,
    enum: ['pending','confirm', 'processing','qualitycheck', 'shipped', 'delivered'],
    default: 'pending',
  },
  totalAmount: { type: Number, min: 0 },
  paymentMethod: { type: String, enum: ['creditCard', 'paypal','cash', 'other'],
  default: 'other',
 },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
