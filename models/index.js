var mongoose = require("mongoose");
 mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );

// module.exports.Campsite = require("./campsite.js.example");
