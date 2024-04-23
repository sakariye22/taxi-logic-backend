const Ride = require('../model/Ride.js');
const User = require('../model/User.js');
const mongoose = require('mongoose');
require('dotenv').config();
const { connection } = require('../db.js');
const { GridFSBucket, ObjectId } = require('mongodb');
const axios = require('axios');
const GOOGLE_MAPS_API_KEY=process.env.GOOGLE_MAPS_API_KEY

const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const userId = req.user.id; 
      return new Promise((resolve, reject) => {
        const fileInfo = {
          filename: `${Date.now()}-profile-${userId}`,
          bucketName: 'uploads', 
        };
        resolve(fileInfo);
      });
    },
  });
  
  const upload = multer({ storage }).single('profilePicture');





async function updateLocation(req, res) {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
        return res.status(400).send('Invalid latitude or longitude provided.');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.latitude = mongoose.Types.Decimal128.fromString(latitude.toString());
        user.longitude = mongoose.Types.Decimal128.fromString(longitude.toString());
        await user.save();

        res.status(200).json({
            message: 'Location updated successfully',
            location: { latitude, longitude }
        });
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).send('Server Error');
    }
}


async function RideRequest(req, res) {
    const userId = req.user.id; 
    const { pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const ride = new Ride({
            user_id: userId,
            driver_id: null, // No driver assigned at the moment of creation
            pickup_latitude: mongoose.Types.Decimal128.fromString(pickup_latitude.toString()),
            pickup_longitude: mongoose.Types.Decimal128.fromString(pickup_longitude.toString()),
            dropoff_latitude: mongoose.Types.Decimal128.fromString(dropoff_latitude.toString()),
            dropoff_longitude: mongoose.Types.Decimal128.fromString(dropoff_longitude.toString()),
            status: 'requested',  // Initial status for a new ride
            fare_status: 'waiting_for_proposals'  // Awaiting driver proposals
        });

        await ride.save(); 
        res.status(201).json({ message: 'Ride requested successfully. Awaiting driver proposals.', rideId: ride._id });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500). send('Server Error');
    }
}




async function PostProfilePicture(req, res) {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const newFileIdentifier = req.file.filename; 

        if (user.profilePictureUrl) {
            const db = mongoose.connection.db;
            const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
            try {
                const oldFileIdentifier = user.profilePictureUrl;
                const oldFile = await db.collection('uploads.files').findOne({ filename: oldFileIdentifier });
                if (oldFile) {
                    await bucket.delete(oldFile._id); 
                }
            } catch (deleteError) {
                console.error('Error deleting old profile picture:', deleteError);
              
            }
        }

        user.profilePictureUrl = newFileIdentifier;
        await user.save();

        res.json({ message: 'Profile picture updated successfully', fileUrl: newFileIdentifier });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).send('Server Error');
    }
}

async function getProfilePictureUrl(req, res) {
    const userId = req.user.id;

    try {

        const user = await User.findById(userId);
        if (!user || !user.profilePictureUrl) {
            return res.status(404).send('No profile picture found.');
        }

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

   
        const filename = user.profilePictureUrl;


        const file = await db.collection('uploads.files').findOne({ filename: filename });
        if (!file) {
            return res.status(404).send('No file found.');
        }

    
        res.setHeader('Content-Type', 'image/jpeg'); 
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');

        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error serving profile picture:', error);
        res.status(500).send('Server Error');
    }
}

async function getProfilePictureNative(req, res) {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user || !user.profilePictureUrl) {
            return res.status(404).send('No profile picture found.');
        }

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        const filename = user.profilePictureUrl;

        const file = await db.collection('uploads.files').findOne({ filename: filename });
        if (!file) {
            return res.status(404).send('No file found.');
        }
        res.setHeader('Content-Type', file.contentType); 
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');

        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error serving profile picture:', error);
        res.status(500).send('Server Error');
    }
}

async function getUserDetails(req, res) {
    const userId = req.user.id; 

    try {
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).send({
            username: user.name,
            email: user.email,
            phoneNumber: user.phone_number 
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('Server Error');
    }
}
async function updateUserDetails(req, res) {
    const userId = req.user.id;
    const { name, email, phoneNumber } = req.body;  
    if (!name && !email && !phoneNumber) {
        return res.status(400).send('No updates provided');
    }

    try {
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phone_number = phoneNumber;

        await user.save(); 

        return res.status(200).send({
            username: user.name,
            email: user.email,
            phoneNumber: user.phone_number 
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('Server Error');
    }
}




function simulateDriverMovement(driver) {
    // Randomly adjust the latitude and longitude to simulate movement
    const movement = Math.random() * 0.01 - 0.005;
    driver.latitude += movement;
    driver.longitude += movement;

    return snapToRoad(driver.latitude, driver.longitude);
}





async function snapToRoad(latitude, longitude) {
    const url = `https://roads.googleapis.com/v1/nearestRoads?points=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data.snappedPoints) && response.data.snappedPoints.length > 0) {
            const snappedLocation = response.data.snappedPoints[0].location;
            return { latitude: snappedLocation.latitude, longitude: snappedLocation.longitude };
        }
        return { latitude, longitude };  
    } catch (error) {
        console.error('Error snapping to roads:', error);
        return { latitude, longitude };  
    }
}




module.exports = { RideRequest, getProfilePictureUrl,  PostProfilePicture ,upload, getProfilePictureNative, getUserDetails, updateUserDetails, updateLocation};   
// jjsdwrssfsfweqeqeetetete