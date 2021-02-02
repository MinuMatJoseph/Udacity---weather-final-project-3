/* Empty JS object to act as endpoint for all routes */
projectData  = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('website'));

// const port = 3000;
/**Assign a port to the server */
const port = process.env.PORT || 3000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

/**Get route */

app.get('/all', function(req, res) {
    res.send(projectData );
})  

app.post('/projectData', function(req, res) {
    newEntry = {
      name: req.body.name, 
      date: req.body.date,
      temp: req.body.temp,
      feels: req.body.feels,
      description: req.body.description,
      userComment: req.body.userComment
    };
    projectData  = newEntry;
    res.send(projectData );
    console.log({message: "Post Recieved"});
});