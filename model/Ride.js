const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  pickupLatitude: {
    type: Number,
    required: true, 
    min: -90,
    max: 90,
  },
  pickupLongitude: {
    type: Number,
    required: true, 
    min: -180,
    max: 180,
  },
  dropoffLatitude: {
    type: Number,
    required: true, 
    min: -90,
    max: 90,
  },
  dropoffLongitude: {
    type: Number,
    required: true, 
    min: -180,
    max: 180,
  },
  status: {
    type: String,
    required: true,
    enum: ['requested', 'accepted', 'enroute', 'completed', 'cancelled'],
    default: 'requested',
  },
  fare: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
