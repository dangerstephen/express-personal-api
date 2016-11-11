// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var new_movie = {description: "creating new movies left and right."}

db.Movie.create(new_movie, function(err, Movie){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new movie",)
  process.exit(); // we're all done! Exit the program.
})
