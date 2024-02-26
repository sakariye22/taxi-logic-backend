const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicle: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      validate: [validateCoordinates, '{PATH} must have exactly 2 elements (longitude, latitude)']
    },},
  onRide: { type: Boolean, default: false },
}, { timestamps: true });
function validateCoordinates(val) {
  return val.length === 2;
}

module.exports = mongoose.model('Driver', driverSchema);
