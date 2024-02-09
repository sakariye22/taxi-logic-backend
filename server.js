require("dotenv").config();

const PORT = process.env.PORT || 8082;
const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const morgan = require("morgan");

const drivers = [
  {
    "name": "Driver One",
    "email": "driver1@example.com",
    "password": "hashed_password",
    "phoneNumber": "0701234567",
    "licenseNumber": "license123",
    "vehicle": "Car A",
    "isActive": true,
    "lat": 59.6167,
    "lng": 17.8452
},
{
    "name": "Driver Two",
    "email": "driver2@example.com",
    "password": "hashed_password",
    "phoneNumber": "0707654321",
    "licenseNumber": "license456",
    "vehicle": "Car B",
    "isActive": true,
    "lat": 59.6165,
    "lng": 17.8454
},
{
    "name": "Driver Three",
    "email": "driver3@example.com",
    "password": "hashed_password",
    "phoneNumber": "0712345678",
    "licenseNumber": "license789",
    "vehicle": "Car C",
    "isActive": true,
    "lat": 59.6163,
    "lng": 17.8456
},
{
    "name": "Driver Four",
    "email": "driver4@example.com",
    "password": "hashed_password",
    "phoneNumber": "0718765432",
    "licenseNumber": "license012",
    "vehicle": "Car D",
    "isActive": true,
    "lat": 59.6161,
    "lng": 17.8458
}

]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors()); 

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ user: "logic backend" });
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
