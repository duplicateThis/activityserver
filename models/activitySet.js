var mongoose = require('mongoose')
var Schema = mongoose.Schema

var activitySetSchema = new Schema({
  'user': String,
  'id': String,
  'name': String,
  'state': Boolean
})

module.exports = mongoose.model('activitySet', activitySetSchema)