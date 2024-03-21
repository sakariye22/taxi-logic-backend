const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  is_active: { type: Boolean, default: false },
  latitude: { type: mongoose.Types.Decimal128, default: null },
  longitude: { type: mongoose.Types.Decimal128, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
