const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {RideRequest, Awaiting} = require ('../Unative/native-user.js');



router.post('/request-ride', authenticateToken, RideRequest );
router.get ('/waiting/rides', authenticateToken, Awaiting);



  
  
module.exports = router; 