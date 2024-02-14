require("dotenv").config();

const PORT = process.env.PORT || 8082;
const express = require("express");
const app = express();

const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const morgan = require("morgan");


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
