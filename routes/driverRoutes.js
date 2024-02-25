const express = require('express');
const router = express.Router();
const Driver = require('../model/Driver.js'); 
const Ride = require('../model/Ride.js');
require('dotenv').config();

router.patch('/update-location/:driverId', async (req, res) => {
    const { driverId } = req.params;
    const { location } = req.body;
  
    if (!location || !location.coordinates) {
        return res.status(400).send({ message: 'Location coordinates are required.' });
    }
  
    try {
        const driver = await Driver.findByIdAndUpdate(driverId, {
            location
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

router.post('/logout-driver', async (req, res) => {
    try {
      const driverId = req.body.driverId;
  
      const driver = await Driver.findByIdAndUpdate(driverId, {
        $unset: { location: "" } 
      }, { new: true });
  
      if (!driver) {
        return res.status(404).send({ message: 'Driver not found.' });
      }
  
      res.status(200).json({ message: 'Logout successful, location data cleared.' });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send({ message: 'Server error while processing logout.', error: error.message });
    }
  });
  

  


router.get('/requests', async (req,res)=>{


});



  module.exports = router;



  


