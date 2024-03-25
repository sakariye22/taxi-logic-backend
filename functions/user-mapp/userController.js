require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;





   async function forUser (req,res){
    res.json ('this is for users pages mainly react')
   };
 
    
    
module.exports = {forUser};
