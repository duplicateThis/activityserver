var mongoose = require('mongoose')
var Schema = mongoose.Schema

var activityClassifySchema = new Schema({
  'user': String,
  'id': String,
  'name': String
})

module.exports = mongoose.model('activityClassify', activityClassifySchema)