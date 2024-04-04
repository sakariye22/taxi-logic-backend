
const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require("../middleware/authenticate-token")
const {testingfuctions, updateProfilePicture } = require ('../user-mapp/userController')

router.get ('/user-profile', authenticateToken, testingfuctions);

router.post ('/user-image', authenticateToken, updateProfilePicture);

module.exports = router;