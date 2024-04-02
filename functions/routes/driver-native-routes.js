const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {GetRides,ProposePrice} = require ('../Dnative/native-driver.js');


router.get ('/rides', authenticateToken, GetRides);

router.post('/suggest', authenticateToken, ProposePrice);



  
  
module.exports = router; 