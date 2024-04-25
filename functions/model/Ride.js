const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: false },
  pickup_latitude: { type: mongoose.Types.Decimal128, required: true },
  pickup_longitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_latitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_longitude: { type: mongoose.Types.Decimal128, required: true },
  distance: { type: Number, required: true }, // Distance from Google API (in meters)
  duration: { type: Number, required: true }, // Duration from Google API (in seconds)
  fare: { type: mongoose.Types.Decimal128, required: true }, // Calculated fare
  status: { type: String, enum: ['requested', 'accepted', 'enroute', 'completed'], default: 'requested' },
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);

