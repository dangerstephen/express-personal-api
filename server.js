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
  profileImage: "https://avatars2.githubusercontent.com/u/22550925?v=3&s=460",
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
      {method: "POST", path: "/api/movies", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function index (req, res) {
  res.json({profile});
});

// get all movies
app.get('/api/movies', function (req, res) {
  // find one movie by its id
  db.Movie.find({})
    .populate('director')
    .exec(function(err, movies){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(movies);
    });

});



app.get('/api/movies/:id', function (req, res) {
  // find one movie by its id
  db.Movie.findById(req.params.id)
    // populate the director
    .populate('director')
    .exec(function(err, movie){
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(movie);
    });

});



app.post('/api/movies', function (req, res) {
  // create new movie with form data (`req.body`)
  var newMovie = new db.Movie({
    title: req.body.title,
    trailer: req.body.trailer,
  });
  // find the director from req.body
  db.Director.findOne({name: req.body.director}, function(err, director){
    if (err) {
      return console.log(err);
    }

    if(director === null){
          console.log("We have encountered a new director");

          var newDirector = new db.Director({
            name: req.body.Director
          });
          newDirector.save();



    // add this director to the movie
    newMovie.director = newDirector;

}

    // save newMovie to database
    newMovie.save(function(err, movie){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", movie.title);
      // send back the movie!
      res.json(movie);
    });
  });

});


// delete movie
app.delete('/api/movies/:id', function (req, res) {
  // get movie id from url params (`req.params`)
  console.log(req.params)
  var movieId = req.params.id;

  db.Movie.findOneAndRemove({ _id: movieId }, function (err, deletedMovie) {
    res.json(deletedMovie);
  });
});
// end edit here


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
