const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")




const {} = require ('.')



router.get('/', authenticateToken,);



  
  
module.exports = router; 