require("dotenv").config();
require('./db'); // This line ensures your MongoDB connection is established

const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const driverRoutes = require('./routes/driverRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const rideRoutes = require ('./routes/rideRoutes.js');

var corsOptions = {
  origin: '*', 
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json()); 
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ user: "logic backend" });
});

app.use('/api', driverRoutes);
app.use('/api', userRoutes);
app.use('/api/ride', rideRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
