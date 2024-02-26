const express = require('express');
const router = express.Router();
const Driver = require('../model/Driver.js'); 
const Ride = require('../model/Ride.js');
require('dotenv').config();

router.patch('/update-location/:driverId', async (req, res) => {
  const { driverId } = req.params;
  const { latitude, longitude } = req.body;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).send({ message: 'Latitude and longitude are required.' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).send({ message: 'Latitude and longitude must be numbers.' });
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).send({ message: 'Latitude must be between -90 and 90 and longitude between -180 and 180.' });
  }

  try {
    const driver = await Driver.findByIdAndUpdate(driverId, {
      latitude, 
      longitude,
    }, { new: true });

    if (!driver) {
      return res.status(404).send({ message: 'Driver not found.' });
    }

    res.status(200).send({ message: 'Location updated successfully.', driver });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while updating location.', error: error.message });
  }
});

router.patch('/mark-active/:driverId', async (req, res) => {
  const { driverId } = req.params;

  try {
    const driver = await Driver.findByIdAndUpdate(driverId, {
      isActive: true,
    }, { new: true });

    if (!driver) {
      return res.status(404).send({ message: 'Driver not found.' });
    }

    res.status(200).send({ message: 'Driver marked as active successfully.', driver });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while marking driver as active.', error: error.message });
  }
});





router.post('/logout-driver', async (req, res) => {
    try {
      const driverId = req.body.driverId;
  
      const driver = await Driver.findByIdAndUpdate(driverId, {
        isActive: false 
      }, { new: true });
  
      if (!driver) {
        return res.status(404).send({ message: 'Driver not found.' });
      }
  
      res.status(200).json({ message: 'Logout successful, driver marked as inactive.' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send({ message: 'Server error while processing logout.', error: error.message });
    }
});

  

  


router.get('/requests', async (req,res)=>{


});



  module.exports = router;



  


