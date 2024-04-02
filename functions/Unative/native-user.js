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
module.exports = { RideRequest };
