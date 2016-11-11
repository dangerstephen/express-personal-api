// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

var profile = {
  name: "Stephen",
  birthState: "arizona",
  alive: true,
  githubLink:"https://github.com/dangerstephen",
  githubProfileImage: "https://avatars2.githubusercontent.com/u/22550925?v=3&s=460",
  personalSiteLink:  "https://dangerstephen.github.io/",
  currentCity: "San Francisco",
  siblings: [
    {name: "Sherman Dangerfield", relationship: "Brother"},
    {name: "Alan Dangerfield ", relationship: "Brother"},
    {name: "Philip Dangerfield", relationship: "Brother"},
    {name: "Jacob Dangerfield", relationship: "Brother"},
    {name: "Sarah Dangerfield", relationship: "Sister"}],
  pets: [
    {name:"zipper", type:"dog"},
    {name:"pixel", type:"dog"}
    ]
};

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my Stephen's api! Here's what you need to know!",
    documentationUrl: "https://github.com/dangerstephen/express_self_api/README.md", // CHANGE ME
    baseUrl: "https://vast-plateau-97777.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/movie", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function index (req, res) {
  res.json({profile});
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
