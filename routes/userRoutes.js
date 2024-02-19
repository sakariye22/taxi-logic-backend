const express = require('express');
const router = express.Router();
const User= require('../model/User.js');
const Driver = require('../model/Driver.js');

require('dotenv').config();


router.post('/get-driver-location', async (req, res) => {
    const { driverId } = req.body;
  
    if (!driverId) {
      return res.status(400).send({ message: 'Driver ID is required.' });
    }
  
    try {
      const driver = await Driver.findById(driverId);
  
      if (!driver) {
        return res.status(404).send({ message: 'Driver not found.' });
      }
  
    
      if (!driver.isActive) {
        return res.status(403).send({ message: 'Driver is not currently active.' });
      }
  
      res.status(200).json({
        message: 'Driver location retrieved successfully.',
        location: {
          lat: driver.lat,
          lng: driver.lng,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error while retrieving driver location.', error: error.message });
    }
  });
  router.post('/logout-user', async (req, res) => {
    try { }
   catch (error) { }
  });


  module.exports = router;



  


