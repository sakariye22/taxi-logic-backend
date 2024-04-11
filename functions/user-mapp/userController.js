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
           highScore: 99999999
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


async function updateProfilePicture(req, res) {
   const userId = req.user.id;
   const { profilePictureUrl } = req.body;

   if (!profilePictureUrl) {
       return res.status(400).json({ message: 'Profile picture URL is required' });
   }

   try {
       const updatedUser = await User.findByIdAndUpdate(userId, { profilePictureUrl: profilePictureUrl }, { new: true });

       if (!updatedUser) {
           return res.status(404).json({ message: 'User not found' });
       }

       res.json({
           message: 'Profile picture updated successfully',
           profilePictureUrl: updatedUser.profilePictureUrl
       });
   } catch (error) {
       console.error('Error updating profile picture:', error);
       res.status(500).json({ message: 'Internal server error' });
   }
}

module.exports = { forUser, testingfuctions, updateProfilePicture };