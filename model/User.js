const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentMethod: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
  },
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.lat !== undefined && this.lng !== undefined) {
    this.location = { type: 'Point', coordinates: [this.lng, this.lat] };
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
