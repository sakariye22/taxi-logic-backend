// for react native driver app 
const Ride = require('../model/Ride.js');
const Driver = require('../model/Driver.js');
const mongoose = require('mongoose');
require('dotenv').config();

async function GetRides(req, res) {
    try {
        // Fetch rides that are currently awaiting proposals
        const rides = await Ride.find({ fare_status: 'waiting_for_proposals' })
            .select('-__v')
            .lean()
            .exec();

        if (!rides || rides.length === 0) {
            return res.status(404).json({ message: 'No rides currently awaiting proposals.' });
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

async function ProposePrice(req, res) {
    const { rideId, driverId, proposedFare } = req.body;
    
    try {
        // Fetch the ride by ID
        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }


        if (ride.fare_status !== 'waiting_for_proposals') {
            return res.status(400).json({ message: 'This ride is no longer awaiting proposals.' });
        }


        ride.driver_id = driverId; 
        ride.proposedFare = proposedFare; 
        ride.fare_status = 'negotiating'; // Update the fare status

        await ride.save();

        res.status(200).json({ message: 'Price proposed successfully.', ride });
    } catch (error) {
        console.error('Error proposing price:', error);
        res.status(500).send('Server Error');
    }
}


module.exports = { GetRides, ProposePrice }; 
