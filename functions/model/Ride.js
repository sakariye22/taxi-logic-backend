const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: false }, 
  pickup_latitude: { type: mongoose.Types.Decimal128, required: true },
  pickup_longitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_latitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_longitude: { type: mongoose.Types.Decimal128, required: true },
  distance: { type: Number, required: false }, // Distance from Google API (in meters)
  duration: { type: Number, required: false }, // Duration from Google API (in seconds)
  fare: { type: mongoose.Types.Decimal128, required: false }, // Calculated fare based on the Google API
  status: { type: String, enum: ['requested', 'accepted', 'enroute', 'completed'], default: 'requested' },
  fare_status: { type: String, enum: ['calculated'], default: 'calculated' }, // Simplified fare status
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
