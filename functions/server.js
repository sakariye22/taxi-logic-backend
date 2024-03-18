const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');




app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true }));


  



const users = [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "123456",
      "phone_number": "1234567890",
      "payment_method": "Credit Card",
      "latitude": "59.61934188157599", 
      "longitude": "17.857314214020047"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "password": "encrypted_password_2",
      "phone_number": "0987654321",
      "payment_method": "PayPal",
      "latitude": "59.50805067408462",
      "longitude": "17.930932508300696"
    },
    {
      "id": 3,
      "name": "Alice Johnson",
      "email": "alicejohnson@example.com",
      "password": "encrypted_password_3",
      "phone_number": "5555555555",
      "payment_method": "Debit Card",
      "latitude": "59.40279875896796", 
      "longitude": "17.94903372558612"
    }
  ];

const rides = [
    {
      "id": 1,
      "user_id": 1,
      "driver_id": 1,
      "pickup_latitude": "59.61934188157599",
      "pickup_longitude": "17.857314214020047",
      "dropoff_latitude": "59.50805067408462",
      "dropoff_longitude": "17.930932508300696",
      "status": "requested",
      "fare": "50.00",
      "created_at": "2024-03-17T12:00:00Z",
      "updated_at": "2024-03-17T12:00:00Z"
    },
    {
      "id": 2,
      "user_id": 2,
      "driver_id": 2,
      "pickup_latitude": "59.50805067408462",
      "pickup_longitude": "17.930932508300696",
      "dropoff_latitude": "59.40279875896796",
      "dropoff_longitude": "17.94903372558612",
      "status": "accepted",
      "fare": "60.00",
      "created_at": "2024-03-17T12:10:00Z",
      "updated_at": "2024-03-17T12:15:00Z"
    },
    {
      "id": 3,
      "user_id": 3,
      "driver_id": 1,
      "pickup_latitude": "59.40279875896796",
      "pickup_longitude": "17.94903372558612",
      "dropoff_latitude": "59.61934188157599",
      "dropoff_longitude": "17.857314214020047",
      "status": "enroute",
      "fare": "70.00",
      "created_at": "2024-03-17T12:20:00Z",
      "updated_at": "2024-03-17T12:30:00Z"
    },
    {
      "id": 4,
      "user_id": 1,
      "driver_id": 2,
      "pickup_latitude": "59.61934188157599",
      "pickup_longitude": "17.857314214020047",
      "dropoff_latitude": "59.40279875896796",
      "dropoff_longitude": "17.94903372558612",
      "status": "complete",
      "fare": "80.00",
      "created_at": "2024-03-17T12:40:00Z",
      "updated_at": "2024-03-17T12:50:00Z"
    }
  ];
 const payments = [
    {
      "id": 1,
      "ride_id": 1,
      "user_id": 1,
      "amount": "50.00",
      "status": "pending",
      "payment_method": "Credit Card"
    },
  ];
  
 const earnings = [
    {
      "id": 1,
      "driver_id": 1,
      "ride_id": 1,
      "amount": "50.00",
      "created_at": "2024-03-17T12:50:00Z"
    },
  ];
  
 
  
 app.get('/', (req, res) => {
    res.json('ok');
  });
  
  // Load Driver Data
// Load Driver Data
const loadDriverData = () => {
    const filePath = path.join(__dirname, 'make-konto', 'driver.json'); // Correct file path
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            return JSON.parse(data.toString());
        } else {
            return []; // Return an empty array if the file doesn't exist
        }
    } catch (err) {
        console.error('Error loading driver data:', err);
        return [];
    }
};

// Save Driver Data
const saveDriverData = (data) => {
    const filePath = path.join(__dirname, 'make-konto', 'driver.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Driver data saved successfully.');
    } catch (err) {
        console.error('Error saving driver data:', err);
    }
};


app.post('/register-driver', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received request to register driver:', { name, email, password });

    if (!name || !email || !password) {
        console.error('Name, email, and password are required.');
        return res.status(400).send({ message: 'Name, email, and password are required.' });
    }

    let drivers = loadDriverData();
    if (!drivers) {
        drivers = [];
    }
    console.log('Existing drivers:', drivers);

    const newDriver = {
        id: uuidv4(), 
        name,
        email,
        password,
        latitude: null,
        longitude: null,
    };
    console.log('New driver:', newDriver);

    drivers.push(newDriver);
    console.log('Drivers after adding new driver:', drivers);

    saveDriverData(drivers);
    console.log('Driver data saved successfully.');

    // Send response with only the newly registered driver data
    res.status(201).send({ message: 'Driver registered successfully', driver: newDriver });
});



  
// Function to delete all drivers
const deleteAllDrivers = () => {
    try {
        // Clear the driver data array
        const emptyDriverData = [];
        saveDriverData(emptyDriverData);
        console.log('All drivers deleted successfully.');
    } catch (error) {
        console.error('Error deleting drivers:', error);
    }
};

// Example usage:
deleteAllDrivers();


  

  const loadVehicleData = () => {
    const filePath = path.join(__dirname, 'make-konto', 'vehicle.json');
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            return JSON.parse(data.toString());
        }
    } catch (err) {
        console.error('Error loading vehicle data:', err);
        return []; 
    }
};

const saveVehicleData = (data) => {
    const filePath = path.join(__dirname, 'make-konto', 'vehicle.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error saving vehicle data:', err);
    }
};

app.post('/vehicles', (req, res) => {
    const newVehicle = req.body;
    if (!newVehicle.make || !newVehicle.model) {
        return res.status(400).send({ message: 'Make and model are required.' });
    }

    const vehicles = loadVehicleData();
    newVehicle.id = vehicles.length + 1; 
    vehicles.push(newVehicle);
    saveVehicleData(vehicles);

    res.status(201).send({ message: 'Vehicle added successfully', vehicle: newVehicle });
});
app.get('/hello',(req,res)=> {
  res.json('hello world');
})
  


  
module.exports = app;