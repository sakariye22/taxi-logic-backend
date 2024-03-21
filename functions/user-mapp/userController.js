require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const mongoDB = process.env.MONGODB_URL; 



    async function protectedUser(req, res) {
        res.json('This is data from logic backend');
    }
    

module.exports = { protectedUser};
