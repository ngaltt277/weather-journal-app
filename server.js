// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

app.get("/show", function (request, response) {
  response.send(projectData);
});

app.post("/add", function (request, response) {
  const { temperature, date, userResponse } = request.body;
  projectData = {
    temperature,
    date,
    userResponse,
  };
  response.send(projectData);
});
