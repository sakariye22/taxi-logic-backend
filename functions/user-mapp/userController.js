require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;





   async function forUser (req,res){
      res.json ('this is for users pages mainly react')
   };
   async function testingfuctions (req,res){
      res.json({
         username: "hes",
         password: "w312324",
         type: "1221",
         details: {
           favoriteColor: "neon green",
           subscriptionLevel: "gold",
           interests: ["juggling", "unicycling", "kayaking"],
           lastLogin: "2077-01-01T00:00:00Z"
         },
         metrics: {
           sessionCount: 42,
           achievementPoints: 1234,
           highScore: 9999999
         },
         status: {
           online: false,
           accountStatus: "active",
           mood: "elated"
         },
         settings: {
           notifications: true,
           darkMode: "enabled",
           language: "Klingon"
         }
       });
      }
    
module.exports = {forUser,testingfuctions};

