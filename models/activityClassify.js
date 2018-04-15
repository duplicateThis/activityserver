var mongoose = require('mongoose')
var Schema = mongoose.Schema

var activityClassifySchema = new Schema({
  'activityCLassifyId': {type: String},
  'user': String,
  'activityClassName': String,
})

module.exports = mongoose.model('activityClassify', activityClassifySchema)