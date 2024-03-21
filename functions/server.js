const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true }));


  


 
  
 app.get('/', (req, res) => {
    res.json('ok');
  });
  
app.use('/api', userRoutes);





  
module.exports = app;