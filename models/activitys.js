var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  // 'activityId': {type: String},
  'id': String,
  'user': String,
  'number': String,
  'name': String,
  'thost': String,
  'Classify': String,
  'address': Array,
  'ds': Date,
  'de': Date,
  'tags': Array,
  'count': Number,
  'public': Boolean,
  'imageUrl': String,
  'detail': String,
  'settings': Array,
  'issue': Boolean
})

module.exports = mongoose.model('activity', activitySchema)