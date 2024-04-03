const Ride = require('../model/Ride.js');
const User = require('../model/User.js');
const mongoose = require('mongoose');
require('dotenv').config();

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
            pickup_latitude,
            pickup_longitude,
            dropoff_latitude,
            dropoff_longitude,
            fare_status: 'waiting_for_proposals' 
        });

        await ride.save(); 
        res.status(201).json({ message: 'Ride requested successfully. Awaiting driver proposals.', rideId: ride._id });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).send('Server Error');
    }
}
async function Awaiting(req, res) {
    try {
        const userId = req.user.id; 
        const rides = await Ride.find({
            user_id: userId,
            fare_status: 'waiting_for_proposals'
        }).select('-__v') 
          .lean() 
          .exec();

        if (!rides || rides.length === 0) {
            return res.status(404).json({ message: 'No rides found awaiting proposals.' });
        }

        const enhancedRides = rides.map(ride => ({
            ...ride,
            pickup_latitude: ride.pickup_latitude.toString(), 
            pickup_longitude: ride.pickup_longitude.toString(),
            dropoff_latitude: ride.dropoff_latitude.toString(),
            dropoff_longitude: ride.dropoff_longitude.toString(),
            createdAt: ride.createdAt.toISOString(), 
            updatedAt: ride.updatedAt.toISOString(),
        }));

        res.json({ rides: enhancedRides });
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = { RideRequest, Awaiting };
//some comments