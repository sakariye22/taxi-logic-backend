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
      'location.coordinates': { $exists: true, $ne: [0, 0] } // Check that the location has been set
    }, 'location -_id').exec();

    if (drivers.length === 0) {
      return res.status(404).send({ message: 'No drivers with location found.' });
    }

    const locations = drivers.map(driver => driver.location);

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
  const { userId, pickupAddress, dropoffAddress, fare } = req.body;
  console.log('Request Body:', req.body);
  try {
   
    const pickupCoordinates = await geocodeAddress(pickupAddress);
    if (!pickupCoordinates) {
      return res.status(400).send({ message: 'Invalid pickup address.' });
    }

    const dropoffCoordinates = await geocodeAddress(dropoffAddress);
    if (!dropoffCoordinates) {
      return res.status(400).send({ message: 'Invalid dropoff address.' });
    }

    const newRide = new Ride({
      user: userId,
      pickupLocation: {
        type: 'Point',
        coordinates: pickupCoordinates 
      },
      dropoffLocation: {
        type: 'Point',
        coordinates: dropoffCoordinates // [longitude, latitude]
      },
      fare,
      status: 'requested',
    });

    const availableDriver = await Driver.findOne({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: pickupCoordinates // [longitude, latitude]
          },
          $maxDistance: 40075000 // adjust based on your application's requirements
        }
      },
      onRide: false
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



  


