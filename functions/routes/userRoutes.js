/*
const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {protectedUser, workHours, earningsOverview,updateDriverProfile,getDriverProfile} = require ('../user-mapp/driverController.js');


router.get ('/protected-user', authenticateToken, protectedUser);

router.get('/workHours', workHours);

router.get('/earningsOverview', earningsOverview);

router.patch('/profile',authenticateToken, updateDriverProfile);

router.get('/driver/profile', authenticateToken, getDriverProfile);


module.exports = router;*/