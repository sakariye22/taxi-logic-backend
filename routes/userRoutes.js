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
    const drivers = await Driver.find({
      'location.coordinates': { $exists: true, $ne: [0, 0] } 
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
  console.log('Request to /api/request-ride received');
  
  try {
    const pickupCoordinates = await geocodeAddress(pickupAddress);
    const dropoffCoordinates = await geocodeAddress(dropoffAddress);
    
    if (pickupCoordinates === null) {
      return res.status(400).send({ message: 'Geocoding failed for pickup address.' });
    }
    
    if (dropoffCoordinates === null) {
      return res.status(400).send({ message: 'Geocoding failed for dropoff address.' });
    }

    if (!Array.isArray(pickupCoordinates) || pickupCoordinates.length < 2) {
      console.log(`Invalid pickup address or geocoding failed for address: ${pickupAddress}`);
      return res.status(400).send({ 
        message: 'Invalid pickup address or geocoding failed.', 
        address: pickupAddress,
        error: 'Geocoding returned an invalid result.'
      });
    }
    
    
    if (!Array.isArray(dropoffCoordinates) || dropoffCoordinates.length < 2) {
      console.log(`Invalid dropoff address or geocoding failed for address: ${dropoffAddress}`);
      return res.status(400).send({ 
        message: 'Invalid dropoff address or geocoding failed.', 
        address: dropoffAddress,
        error: 'Geocoding returned an invalid result.'
      });
    }

    const drivers = await Driver.find({ onRide: false }).exec();

    const pickupCoordsObj = {
      latitude: pickupCoordinates[1],
      longitude: pickupCoordinates[0],
    };

    let nearestDriver = null;
    let shortestDistance = Infinity;

    drivers.forEach((driver) => {
      if (!driver.location || !Array.isArray(driver.location.coordinates) || driver.location.coordinates.length < 2) {
        console.warn(`Skipping driver with invalid location: ${driver.id}`);
        return; 
      }
    
      const driverLocation = {
        latitude: driver.location.coordinates[1],
        longitude: driver.location.coordinates[0],
      };
    
      const distance = geolib.getDistance(pickupCoordsObj, driverLocation);
    
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestDriver = driver;
      }
    });
    

    if (!nearestDriver) {
      return res.status(404).send({ message: 'No available drivers found.' });
    }

    const newRide = new Ride({
      user: userId,
      driver: nearestDriver._id,
      pickupLocation: {
        type: 'Point',
        coordinates: pickupCoordinates,
      },
      dropoffLocation: {
        type: 'Point',
        coordinates: dropoffCoordinates,
      },
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



  


