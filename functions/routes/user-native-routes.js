const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {RideRequest} = require ('../Unative/native-user.js');



router.get('/user/request-ride', authenticateToken, RideRequest );



  
  
module.exports = router; 