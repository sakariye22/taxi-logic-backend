const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  vehicle: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  lat: { type: Number },
  lng: { type: Number },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
  },
  onRide: { type: Boolean, default: false },
}, { timestamps: true });

driverSchema.pre('save', function(next) {
  if (this.lat !== undefined && this.lng !== undefined) {
    this.location = { type: 'Point', coordinates: [this.lng, this.lat] };
  }
  next();
});

module.exports = mongoose.model('Driver', driverSchema);
