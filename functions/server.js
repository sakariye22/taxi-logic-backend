const express = require('express');
require('./db.js')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const driverRoutes = require('./routes/driverRoutes');
const mongoose = require('mongoose');
const userNativeRoutes = require ('./routes/user-native-routes.js');
const driverNativeRoutes = require ('./routes/driver-native-routes.js');
const userRoutes = require ('./routes/userRoutes.js');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Inside server.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




  


 
  
 app.get('/', (req, res) => {
    res.json('ok');
  });

  
app.use('/api', driverRoutes);


app.use('/api', userRoutes);
//some comment to test actions 

//natiuve routes 
app.use('/user', userNativeRoutes);

app.use ('/driver', driverNativeRoutes);




  
module.exports = app;