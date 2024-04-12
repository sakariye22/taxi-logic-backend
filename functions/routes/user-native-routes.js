const express = require('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token");


// Import the functions and the upload middleware from your controller file
const { RideRequest, Awaiting, getProfilePictureUrl, PostProfilePicture, upload, getProfilePictureNative, getUserDetails, updateUserDetails,updateLocation, simulateNearbyDrivers } = require('../Unative/native-user.js');

// Your existing routes for requesting a ride and getting awaiting rides
router.post('/request-ride', authenticateToken, RideRequest);
router.post('/update-location', authenticateToken, updateLocation);

router.get('/waiting/rides', authenticateToken, Awaiting);
router.post('/update-image', authenticateToken, upload, PostProfilePicture);
router.patch ('/patch',authenticateToken, updateUserDetails);

router.get('/profile-image', authenticateToken, getProfilePictureUrl); 
router.get('/profile-image2', authenticateToken, getProfilePictureNative);  
router.get('/details', authenticateToken, getUserDetails );  

router.post('/simulate-nearby-drivers', authenticateToken, simulateNearbyDrivers);


module.exports = router;
