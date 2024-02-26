const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicle: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  latitude: {
    type: Number,
    required: true, 
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true, 
    min: -180,
    max: 180,
  },
  onRide: { type: Boolean, default: false },
}, { timestamps: true });

/*function validateCoordinates(val) {
  return val.length === 2;
}
*/
module.exports = mongoose.model('Driver', driverSchema);
