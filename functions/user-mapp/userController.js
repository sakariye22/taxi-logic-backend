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

      const updateProfilePicture = async (req, res) => {
        if (!req.file) {
          console.log("No file uploaded.");
          return res.status(400).json({ message: 'No file uploaded.' });
        }
      
        const fileUrl = `/file/${req.file.filename}`;
        console.log("File URL:", fileUrl);
      
        const userId = req.user.id;
      
        try {
          const existingFiles = await gfs.find({ filename: new RegExp(userId) }).toArray();
          if (existingFiles.length > 0) {
            await gfs.delete(new mongoose.Types.ObjectId(existingFiles[0]._id));
          }

          await User.findByIdAndUpdate(userId, { profilePictureUrl: fileUrl });
      
          return res.json({ message: 'Profile picture updated successfully', fileUrl: fileUrl });
        } catch (error) {
          console.error("Error updating user profile picture:", error);
          return res.status(500).json({ message: 'Failed to update profile picture' });
        }
      };
      
      module.exports = { forUser, testingfuctions, updateProfilePicture, upload };get