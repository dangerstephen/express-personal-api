var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  name: String,
  trailer: String
});

var Director = mongoose.model('Director', DirectorSchema);

module.exports = Director;
