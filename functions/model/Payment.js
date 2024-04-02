const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  ride_id: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: mongoose.Types.Decimal128, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  payment_method: { type: String, required: true },
  user_proposed_fare: { type: mongoose.Types.Decimal128, required: false },
  driver_proposed_fare: { type: mongoose.Types.Decimal128, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
