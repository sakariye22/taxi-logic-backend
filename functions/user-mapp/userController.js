require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;





    async function protectedUser(req, res) {
        res.json('This is data from logic backend');
    }
    

    async function workHours(req, res) {
        // Example dummy data for work hours by month
        res.json({
            "Jan": 120,
            "Feb": 100,
            "Mar": 90,
            "Apr": 110,
            "May": 80,
            "Jun": 130,
            "Jul": 125
        });
    }
    
    async function earningsOverview(req, res) {
        // Example dummy data for earnings by month
        res.json({
            "Jan": 4000,
            "Feb": 4500,
            "Mar": 3000,
            "Apr": 3500,
            "May": 2800,
            "Jun": 5000,
            "Jul": 4700
        });
    }
module.exports = { protectedUser, workHours, earningsOverview};
