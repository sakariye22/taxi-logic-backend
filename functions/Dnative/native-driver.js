// for react native driver app 
const Ride = require('../model/Ride.js');
const Driver = require('../model/Driver.js');
const mongoose = require('mongoose');
require('dotenv').config();

async function GetRides(req, res) {
    try {
        // Fetch rides that are in the 'requested' status
        const rides = await Ride.find({ status: 'requested' })  // Fetching all requested rides
            .select('-__v')  // Excluding the version key from the results
            .lean()  // Ensuring the result is a plain JS object for easier handling
            .exec();  // Executing the query

        if (!rides || rides.length === 0) {
            return res.status(404).json({ message: 'No rides currently available for drivers.' });
        }

        // Enhance ride data by converting MongoDB Decimal128 types to string for better API consumption
        const enhancedRides = rides.map(ride => ({
            ...ride,
            pickup_latitude: ride.pickup_latitude.toString(),
            pickup_longitude: ride.pickup_longitude.toString(),
            dropoff_latitude: ride.dropoff_latitude.toString(),
            dropoff_longitude: ride.dropoff_longitude.toString(),
            createdAt: ride.createdAt.toISOString(),  // Converting date to ISO string format
            updatedAt: ride.updatedAt.toISOString(),
        }));

        res.json({ rides: enhancedRides });  // Sending the enhanced rides data as a JSON response
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).send('Server Error');  // Handling server errors
    }
};

async function AcceptRide(req, res) {
    const { rideId, driverId } = req.body;
    
    try {
        // Fetch the ride by ID
        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }

        // Check if the ride is already accepted or handled by another driver
        if (ride.status !== 'requested') {
            return res.status(400).json({ message: 'This ride is no longer available for acceptance.' });
        }

        // Set the driver ID and update the ride status
        ride.driver_id = driverId; 
        ride.status = 'accepted'; // Updating the status to 'accepted'

        await ride.save();

        res.status(200).json({ message: 'Ride accepted successfully.', ride });
    } catch (error) {
        console.error('Error accepting ride:', error);
        res.status(500).send('Server Error');
    }
}



module.exports = { GetRides, AcceptRide }; 
