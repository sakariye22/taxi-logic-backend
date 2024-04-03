const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL;
// Async function to connect to the database
async function connectToDatabase() {
  const startTime = Date.now();
  try {
    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    const endTime = Date.now();
    console.log('Connected to MongoDB');
    console.log(`Connection time: ${endTime - startTime} ms`); 
  } catch (err) {
    const endTime = Date.now();
    console.error('MongoDB connection error:', err);
    console.log(`Failed connection attempt time: ${endTime - startTime} ms`); // Och här
  }
}

connectToDatabase();

module.exports = mongoose.connection;
