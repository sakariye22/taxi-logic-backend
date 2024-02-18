const express = require('express');
const Driver = require('../model/Driver.js'); // Ensure the path is correct

const router = express.Router();

router.post('/drivers/updateLocation', async (req, res) => {
  try {
    const { lat, lng, driverId } = req.body; 
    const driver = await Driver.findByIdAndUpdate(driverId, { lat, lng }, { new: true });
    if (!driver) {
      return res.status(404).send("Driver not found");
    }

    res.send(driver);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});
router.post('/driver-data', async(req,res)=> {
    
})


module.exports = router;
