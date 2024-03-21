const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")

const {protectedUser, workHours, earningsOverview} = require ('../user-mapp/userController.js');


router.get ('/protected-user', authenticateToken, protectedUser);

router.get('/workHours', workHours);

router.get('/earningsOverview', earningsOverview);


module.exports = router;