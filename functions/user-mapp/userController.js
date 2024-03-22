require('dotenv').config();
const Driver = require('../model/Driver.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;





    async function protectedUser(req, res) {
        res.json('This is data from logic backend');
    }
    

    async function workHours(req, res) {
        // Example dummy data for work hours by month
        res.json({
            "Jan": 120,
            "Feb": 100,
            "Mar": 90,
            "Apr": 110,
            "May": 80,
            "Jun": 130,
            "Jul": 125
        });
    }
    
    async function earningsOverview(req, res) {
        // Example dummy data for earnings by month
        res.json({
            "Jan": 4000,
            "Feb": 4500,
            "Mar": 3000,
            "Apr": 3500,
            "May": 2800,
            "Jun": 5000,
            "Jul": 4700
        });
    }
    

    async function updateDriverProfile(req, res) {
        console.log("updateDriverProfile: Start"); // Log start
        const driverId = req.user.id;
        const { name, email, phoneNumber, licenseNumber } = req.body;
    
        console.log("Updating driver profile for ID:", driverId); // Log driverId
        console.log("Received data:", { name, email, phoneNumber, licenseNumber }); // Log received data
    
        try {
            const updatedDriver = await Driver.findByIdAndUpdate(driverId, {
                name: name,
                email: email,
                phone_number: phoneNumber,
                license_number: licenseNumber
            }, { new: true });
    
            console.log("Updated driver:", updatedDriver); // Log the updated driver
    
            // Assuming password is hashed and you do not want to send it back
            updatedDriver.password = undefined;
    
            res.json(updatedDriver);
        } catch (error) {
            console.error("Error updating driver profile:", error);
            res.status(500).json({ error: 'Server Error', details: error.message });
        }
        
    }
    async function getDriverProfile(req, res) {
        console.log("getDriverProfile: Start");
        console.log("Token Payload:", req.user); // Logga payload från JWT för att se om det är korrekt
    
        if (!req.user || !req.user.id) {
            console.error("Missing or invalid token payload");
            return res.status(401).json({ error: "Unauthorized" });
        }
    
        const driverId = req.user.id;
        console.log("Attempting to retrieve profile for driverId:", driverId);
    
        try {
            const driver = await Driver.findById(driverId);
            console.log("Driver found:", driver);
    
            if (driver) {
                driver.password = undefined; // Ta bort lösenordet innan du skickar till klienten
                console.log("Sending driver profile to client");
                res.json(driver);
            } else {
                console.log(`Driver not found with id: ${driverId}`);
                res.status(404).json({ message: 'Driver not found' });
            }
        } catch (error) {
            console.error("Error retrieving driver profile:", error);
            res.status(500).json({ error: 'Server Error', details: error.message });
        }
    }
    
    
module.exports = { protectedUser, workHours, earningsOverview,updateDriverProfile, getDriverProfile};
