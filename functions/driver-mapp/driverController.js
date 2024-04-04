require('dotenv').config();
const Driver = require('../model/Driver.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile); // Utilize promisify to read files with async/await
const nodemailer = require('nodemailer');





    async function protectedUser(req, res) {
        res.json('This is data from logic backend');
    }
    

    async function workHours(req, res) {
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
        const { name, email, phone_number, license_number } = req.body;
    
        console.log("Updating driver profile for ID:", driverId); // Log driverId
        console.log("Received data:", { name, email, phone_number, license_number }); // Log received data
    
        try {
            const updatedDriver = await Driver.findByIdAndUpdate(driverId, {
                name: name,
                email: email,
                phone_number: phone_number,
                license_number: license_number
            }, { new: true });
    
            console.log("Updated driver:", updatedDriver); 

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

   // driverController.js
async function uploadAvatar(req, res) {
    console.log('uploadAvatar called with file:', req.file);
  
    if (!req.file) {
      console.error('No file uploaded with the request.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }
  
    try {
        const driver = await Driver.findById(req.user.id);
        if (!driver) {
          return res.status(404).json({ error: 'Driver not found.' });
        }
        
        // Ange den korrekta sökvägen relativt från rooten av din server
        driver.avatar = `/uploads/${req.file.filename}`;
        await driver.save();
  
      console.log('Avatar uploaded successfully for driver:', driver.id);
      res.json({ message: 'Avatar uploaded successfully', avatar: driver.avatar });
    } catch (error) {
      console.error('Error in uploadAvatar:', error);
      res.status(500).json({ error: 'Server Error', details: error.message });
    }
  }


  const transporter = nodemailer.createTransport({
    service: 'hotmail', // eller 'hotmail', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  // Skapa en funktion för att skicka e-post
  // Inuti sendContactEmail-funktionen i din backend:
async function sendContactEmail(req, res) {
    console.log('Received request to send email with body:', req.body);
    console.log('Environment variables:', process.env.EMAIL, process.env.EMAIL_PASSWORD, process.env.RECEIVER_EMAIL); // Kontrollera att miljövariabler laddas korrekt  
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL, // Din företagsemail
      to: process.env.RECEIVER_EMAIL, // Din mottagaremail
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      // Om du vill använda HTML i din e-postkropp, använd html-egenskapen istället för text
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send('Error sending email.');
      } else {
        console.log('Email sent successfully:', info.response);
        return res.status(200).send('Email sent successfully.');
      }
    });
  }
  
      
    
    
module.exports = { protectedUser, workHours, earningsOverview, updateDriverProfile, getDriverProfile, uploadAvatar, sendContactEmail};

