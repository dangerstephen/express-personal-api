var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProfileSchema = new Schema({
name: String,
birthState: String,
alive: Boolean,
githubLink:String,
profileImage: String,
personalSiteLink:  String,
currentCity: String,
siblings: Array,
pets: Array


});

var Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
