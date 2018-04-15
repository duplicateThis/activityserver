var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  'activityId': {type: String},
  'activityNumber': String,
  'activityName': String,
  'activityHost': String,
})

module.exports = mongoose.model('activity', activitySchema)