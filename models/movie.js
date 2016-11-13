var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  director: {
    type: Schema.Types.ObjectId,
    ref: 'Director'
  },
  trailer: String,
  releaseDate: String
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
