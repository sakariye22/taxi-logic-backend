const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicle: { type: String, required: true },
  isActive: { type: Boolean, default: false }, // This might be dynamically determined now, see below
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
  },
  onRide: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
