const express = require('express');
const router = express.Router();
const User= require('../model/User.js');
const Driver = require('../model/Driver.js');
const Ride = require('../model/Ride.js');
const geolib = require('geolib');


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
          console.log(`Coordinates for address "${address}": [${lng}, ${lat}]`);
          return [lng, lat];
      } else {
          console.error('Geocoding error:', response.data.status);
          return null; 
      }
  } catch (error) {
      console.error('Geocoding error:', error);
      return null; 
  }
};





router.get('/get-location/fordrivers', async (req, res) => {
  try {
    const drivers = await Driver.find({ isActive: true }, 'latitude longitude -_id').exec();

    if (drivers.length === 0) {
      return res.status(404).send({ message: 'No drivers with location found.' });
    }

    res.status(200).json({
      message: 'Driver locations retrieved successfully.',
      locations: drivers, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while retrieving driver locations.', error: error.message });
  }
});
router.post('/request-ride', async (req, res) => {
  const { userId, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, fare } = req.body;
  
  try {
    if (!pickupLatitude || !pickupLongitude || !dropoffLatitude || !dropoffLongitude) {
      return res.status(400).send({ message: 'Complete pickup and dropoff location coordinates are required.' });
    }

    const drivers = await Driver.find({ isActive: true, onRide: false });

    if (!drivers.length) {
      return res.status(404).send({ message: 'No available drivers found.' });
    }

    let nearestDriver = null;
    let shortestDistance = Infinity;
    drivers.forEach(driver => {
      const distance = geolib.getDistance(
        { latitude: pickupLatitude, longitude: pickupLongitude },
        { latitude: driver.latitude, longitude: driver.longitude }
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestDriver = driver;
      }
    });

    if (!nearestDriver) {
      return res.status(404).send({ message: 'No nearest driver found.' });
    }

    const newRide = new Ride({
      user: userId,
      driver: nearestDriver._id,
      pickupLatitude,
      pickupLongitude,
      dropoffLatitude,
      dropoffLongitude,
      fare,
      status: 'requested',
    });

    await newRide.save();

    res.status(200).json({ message: 'Ride requested successfully.', ride: newRide });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while requesting a ride.', error: error.message });
  }
});




/*
router.post('/request-ride', async (req, res) => {
  const { userId, pickupAddress, dropoffAddress, fare } = req.body;
  console.log('Request Body:', req.body);
  console.log('Request to /api/request-ride received'); 
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
          },
          $maxDistance: 5000
        }
      },
      onRide: false
    }).exec(); 
    
    

    if (!availableDriver) {
      console.log('Search parameters:', pickupCoordinates);
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

*/


     


  router.post('/logout-user', async (req, res) => {
    try { }
   catch (error) { }
  });


  module.exports = router;



  


