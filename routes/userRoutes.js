const express = require('express');
const router = express.Router();
const User= require('../model/User.js');
const Driver = require('../model/Driver.js');

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
  
  



  router.post('/logout-user', async (req, res) => {
    try { }
   catch (error) { }
  });


  module.exports = router;



  


