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
        if (!req.file) {
          console.log("No file uploaded.");
          return res.status(400).json({ message: 'No file uploaded.' });
        }
      
        const fileUrl = `/file/${req.file.filename}`;
        console.log("File URL:", fileUrl);
      
        const userId = req.user.id; 
      
        try {
          // Search for existing profile picture and delete it
          gfs.find({ filename: new RegExp(userId) }).toArray(async (err, files) => {
            if (err) {
              return res.status(500).json({ message: 'Error searching for existing files' });
            }
            if (files.length > 0) {
              await gfs.delete(new mongoose.Types.ObjectId(files[0]._id));
            }
      
            // Once the old file is deleted, update the user's profilePictureUrl
            await User.findByIdAndUpdate(userId, { profilePictureUrl: fileUrl });
            
            // Return success response
            return res.json({ message: 'Profile picture updated successfully', fileUrl: fileUrl });
          });
        } catch (error) {
          console.error("Error updating user profile picture:", error);
          return res.status(500).json({ message: 'Failed to update profile picture' });
        }
      }
      
      
      module.exports = { forUser, testingfuctions, updateProfilePicture, upload };