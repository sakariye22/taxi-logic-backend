const express = require('express');
const router = express.Router();
const User= require('../model/User.js');
const Driver = require('../model/Driver.js');
const Ride = require('../model/Ride.js');

require('dotenv').config();
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios'); 

// Geocode
async function geocodeAddress(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
          const { lat, lng } = response.data.results[0].geometry.location;
          return [lng, lat];
      } else if (response.data.status === 'ZERO_RESULTS') {
          console.error('Geocoding error: No results found for the address.');
          throw new Error('No results found for the address. Please verify the address details.');
      } else {
          throw new Error('Geocode was not successful for the following reason: ' + response.data.status);
      }
  } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
  }
}





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
      const dropoffCoordinates = await geocodeAddress(dropoffLocation); 
  
      const newRide = new Ride({
        user: userId,
        pickupLocation: {
          type: 'Point',
          coordinates: pickupCoordinates
        },
        dropoffLocation: {
          type: 'Point',
          coordinates: dropoffCoordinates
        },
        fare,
        status: 'requested',
      });
  
      const availableDriver = await Driver.findOne({
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: pickupCoordinates
            }
          }
        },
        onRide: false,
        isActive: true, 
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



  


