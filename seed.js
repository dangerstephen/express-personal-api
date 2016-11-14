// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var movies_list = [
  {
  title: "Intersteller",
  director : "Christopher Nolan",
  trailer: "https://www.youtube.com/embed/0vxOhd4qlnA" },
  {
  title: "The Dark Knight",
  director : "Christopher Nolan",
  trailer: "https://www.youtube.com/embed/PZpmTj1Q8Q"
  },
  {
  title: "The Martian",
  director : "Ridley Scott",
  trailer: "https://www.youtube.com/embed/ej3ioOneTy8"
  },
  {
  title: "The Blind Side",
  director : "John Lee Hancock",
  trailer: "https://www.youtube.com/embed/wqlHUpQkfXY"
  },
  {
  title: "Steve Jobs",
  director : "Danny Boyle",
  trailer: "https://www.youtube.com/embed/ufMgQNCXy_M"
  },
  {
  title: "The Social Network",
  director : "David Fincher",
  trailer: "https://www.youtube.com/embed/lB95KLmpLR4"
  },
  {
  title: "Zootopia",
  director : "Byron Howard",
  trailer: "https://www.youtube.com/embed/jWM0ct-OLsM"
  },
  {
  title: "Ghostbusters",
  director : "Paul Feig",
  trailer: "https://www.youtube.com/embed/w3ugHP-yZXw"
  },
  {
  title: "Jurassic World",
  director : "Steven Spielberg",
  trailer: "https://www.youtube.com/embed/RFinNxS5KN4"
  },
  {
  title: "London has Fallen",
  director : "Babak Najafi",
  trailer: "https://www.youtube.com/embed/MMbyPhQo75A"
  },
  {
  title: "Italian Job",
  director : "F. Gary Gray",
  trailer: "https://www.youtube.com/embed/5Eyw-Qiwpj0"
  }

];

var directors_list = [
  {
    name: "Christopher Nolan"
  },
  {
    name: "Ridley Scott"
  },
  {
    name: "John Lee Hancock"
  },
  {
    name: "Danny Boyle"
  },
  {
    name: "David Fincher"

  },
  {
    name: "Byron Howard"

  },
  {
    name: "Paul Feig"

  },
  {
    name: "Steven Spielberg"

  },
  {
    name: "Babak Najafi"

  },
  {
    name: "F. Gary Gray"

  }
];



db.Director.remove({}, function(err, directors) {
  console.log('removed all directors');
  db.Director.create(directors_list, function(err, directors){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all directors');
    console.log("created", directors.length, "directors");


    db.Movie.remove({}, function(err, movies){
      console.log('removed all movies');
      movies_list.forEach(function (movieData) {
        var movie = new db.Movie({
          title: movieData.title,
          trailer:movieData.trailer,
        });
        db.Director.findOne({name: movieData.director }, function (err, foundDirector) {
          console.log('found director  ' + foundDirector.name + ' for movie ' + movie.title);
          if (err) {
            console.log(err);
            return;
          }
          movie.director  = foundDirector;
          movie.save(function(err, savedMovie){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedMovie.title + ' by ' + foundDirector.name);
          });
        });
      });
    });

  });
});
