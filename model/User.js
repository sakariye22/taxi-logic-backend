const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentMethod: { type: String },
  latitude: { // Change from 'lat' to 'latitude'
    type: Number,
    required: [true, 'Latitude is required'], 
    min: -90,
    max: 90,
  },
  longitude: { // Change from 'lng' to 'longitude'
    type: Number,
    required: [true, 'Longitude is required'], 
    min: -180,
    max: 180,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
