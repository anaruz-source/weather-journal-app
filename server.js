// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express'),
// Start up an instance of app
   app = express(),

   port = 3030,

   server = app.listen(port, () => { console.log(`NODE SERVER RUNNING ON LOCALHOST: ${port}`)}),

/* Middleware*/

bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// GET (Route) from projectData endpoint

app.get('/all', (request, response) => response.send(projectData));


//POST (Route) Data to projectData endpoint


app.post('/postProjectData', (request, response) => { 
                            
                              Object.keys(request.body).forEach(key, () => projectData[key] = request.body.key);

                              response.send(projectData);
                     
                            } );
