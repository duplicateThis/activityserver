var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  // 'activityId': {type: String},
  'id': String,
  'user': String,
  'name': String,
  'thost': String,
  'classify': String,
  'address': Array,
  'ds': Date,
  'de': Date,
  'tags': Array,
  'count': Number,
  'public': Boolean,
  'imgUrl': Array,
  'detail': String,
  'settings': Array,
  'issue': Boolean,
  'iTime': Date,
  'holding': Boolean,
  'held': Boolean,
  'counted': Number,
  'imgUrled': Array
})

module.exports = mongoose.model('activity', activitySchema)