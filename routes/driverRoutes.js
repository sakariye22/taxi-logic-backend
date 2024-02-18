const express = require('express');
const router = express.Router();
const Driver = require('../model/Driver.js'); // Ensure the path is correct
require('dotenv').config();

router.patch('/update-location/:driverId', async (req, res) => {
    const { driverId } = req.params;
    const { lat, lng } = req.body;
  
    if (!lat || !lng) {
      return res.status(400).send({ message: 'Latitude and longitude are required.' });
    }
  
    try {
        const driver = await Driver.findByIdAndUpdate(driverId, { lat, lng }, { new: true });

  
      if (!driver) {
        return res.status(404).send({ message: 'Driver not found.' });
      }
  
      res.status(200).send({ message: 'Location updated successfully.', driver });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error while updating location.', error: error.message });
      }
      
  });
  
  module.exports = router;



  


