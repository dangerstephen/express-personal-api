// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

//
// var authors_list = [
//   {
//     name: "Harper Lee",
//     alive: false
//   },
//   {
//     name: "F Scott Fitzgerald",
//     alive: false
//   },
//   {
//     name: "Victor Hugo",
//     alive: false
//   },
//   {
//     name: "Jules Verne",
//     alive: false
//   },
//   {
//     name: "Sheryl Sandberg",
//     alive: true
//   },
//   {
//     name: "Tim Ferriss",
//     alive: true
//   },
//   {
//     name: "John Steinbeck",
//     alive: false
//   },
//   {
//     name: "William Shakespeare",
//     alive: false
//   }
// ];

var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

db.Campsite.create(new_campsite, function(err, campsite){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new campsite", campsite._id)
  process.exit(); // we're all done! Exit the program.
})
