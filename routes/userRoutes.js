const express = require('express');
const router = express.Router();
const User= require('../model/User.js');
const Driver = require('../model/Driver.js');
const Ride = require('../model/Ride.js');

require('dotenv').config();




router.get('/get-location/fordrivers', async (req, res) => {
    try {
      const drivers = await Driver.find({
        lat: { $ne: null },
        lng: { $ne: null }
      }, 'lat lng -_id').exec();
  
      if (drivers.length === 0) {
        return res.status(404).send({ message: 'No drivers with location found.' });
      }
  
     
      const locations = drivers.map(driver => ({
        lat: driver.lat,
        lng: driver.lng,
      }));
  
      res.status(200).json({
        message: 'Driver locations retrieved successfully.',
        locations: locations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error while retrieving driver locations.', error: error.message });
    }
  });
  
  router.post('/request-ride', async (req, res) => {
    const { userId, pickupCoordinates, dropoffLocation, fare } = req.body;
  
    try {
      const newRide = new Ride({
        user: userId,
        pickupLocation: {
          type: 'Point',
          coordinates: pickupCoordinates 
        },
        dropoffLocation,
        fare,
        status: 'requested',
      });
  
    
const availableDriver = await Driver.findOne({
    lat: { $ne: null }, 
    lng: { $ne: null },
    onRide: false, 
  }).exec();
  
      
      if (!availableDriver) {
        return res.status(404).send({ message: 'No available drivers found.' });
      }
  
      newRide.driver = availableDriver._id;
      await newRide.save();
  
      res.status(200).json({ message: 'Ride requested successfully.', ride: newRide });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error while requesting a ride.', error: error.message });
    }
  });
  



  router.post('/logout-user', async (req, res) => {
    try { }
   catch (error) { }
  });


  module.exports = router;



  


