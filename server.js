require("dotenv").config();

const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const morgan = require("morgan");

var corsOptions = {
  origin: '*', 
  
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsOptions)); 

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ user: "logic backend" });
});


app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
 console.log(`Received location: Latitude ${latitude}, Longitude ${longitude}`);

  res.status(200).json({ message: 'Location received successfully.' });
});


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
