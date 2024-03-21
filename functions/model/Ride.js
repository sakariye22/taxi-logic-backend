const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  pickup_latitude: { type: mongoose.Types.Decimal128, required: true },
  pickup_longitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_latitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_longitude: { type: mongoose.Types.Decimal128, required: true },
  status: { type: String, enum: ['requested', 'accepted', 'enroute', 'completed'], default: 'requested' },
  fare: { type: mongoose.Types.Decimal128, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
