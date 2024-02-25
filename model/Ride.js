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
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    }
  },
  dropoffLocation: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true,
    },
    coordinates: {
      type: [Number], 
      required: true,
    }
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
  driverLocation: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: false,
    }
  },
}, { timestamps: true }); 

// Indexing geospatial fields
rideSchema.index({ 'pickupLocation': '2dsphere' });
rideSchema.index({ 'dropoffLocation': '2dsphere' });
rideSchema.index({ 'driverLocation': '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
