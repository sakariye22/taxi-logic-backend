// for react native driver app 
const Ride = require('../model/Ride.js');
const Driver = require('../model/Driver.js');
const mongoose = require('mongoose');
require('dotenv').config();



async function updateLocation(req, res) {
    const driverId = req.user.id; 

    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
        return res.status(400).send('Invalid latitude or longitude provided.');
    }

    try {
        const driver = await Driver.findById(driverId);

        if (!driver) {
            return res.status(404).send('Driver not found');
        }

        driver.latitude = mongoose.Types.Decimal128.fromString(latitude.toString());
        driver.longitude = mongoose.Types.Decimal128.fromString(longitude.toString());

        await driver.save();

        res.status(200).json({
            message: 'Location updated successfully',
            location: { latitude, longitude }
        });
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).send('Server Error');
    }
}

async function GetRides(req, res) {
    try {
        
        const rides = await Ride.find({ status: 'requested' })  
            .select('-__v')  
            .lean()  
            .exec();  

        if (!rides || rides.length === 0) {
            return res.status(404).json({ message: 'No rides currently available for drivers.' });
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

async function AcceptRide(req, res) {
    const { rideId, driverId } = req.body;
    
    try {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).send('Ride not found');
        }

        if (ride.status !== 'requested') {
            return res.status(400).json({ message: 'This ride is no longer available for acceptance.' });
        }

        ride.driver_id = driverId; 
        ride.status = 'accepted'; 

        await ride.save();

        res.status(200).json({ message: 'Ride accepted successfully.', ride });
    } catch (error) {
        console.error('Error accepting ride:', error);
        res.status(500).send('Server Error');
    }
}



module.exports = { GetRides, AcceptRide, updateLocation }; 
