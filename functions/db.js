const mongoose = require('mongoose');
require('dotenv').config();
// Import GridFSBucket from the MongoDB driver
const { GridFSBucket } = require('mongodb');

const mongoURI = process.env.MONGODB_URL;
let gfs;

// Async function to connect to the database
async function connectToDatabase() {
  const startTime = Date.now();
  try {
    const db = await mongoose.connect(mongoURI, {
     
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    // Initialize GridFSBucket with the MongoDB database instance
    gfs = new GridFSBucket(db.connection.db, {
      bucketName: 'uploads'
    });

    const endTime = Date.now();
    console.log('Connected to MongoDB');
    console.log(`Connection time: ${endTime - startTime} ms`);
    console.log('GridFSBucket initialized');
  } catch (err) {
    const endTime = Date.now();
    console.error('MongoDB connection error:', err);
    console.log(`Failed connection attempt time: ${endTime - startTime} ms`);
  }
}

connectToDatabase();

// Export both mongoose.connection and gfs
module.exports = { connection: mongoose.connection, gfs };