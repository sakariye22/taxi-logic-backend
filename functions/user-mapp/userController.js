require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require('../middlewware/authenticate-token');

const mongoDB = process.env.MONGODB_URL; 



    async function protectedUser(req, res) {
        res.json('Hello World');
    }
    

module.exports = { registerUser , loginUser , protectedUser};
