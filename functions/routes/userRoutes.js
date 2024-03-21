const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {protectedUser} = require ('../user-mapp/userController.js');





router.get ('/protected-user', authenticateToken, protectedUser);


module.exports = router;