// import models
var Activity = require('../models/activitys.js');

// connect database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/data_a');
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})
mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

module.exports = function (app) {
	// test router
	app.get('/', function (req, res) {
		res.render('index.ejs', {title: 'Express'});
	});

	// creater activity router
	app.get('/create', function (req, res) {
		var activity = new Activity({
			'activityNumber': '10',
  			'activityName': 'jaj',
  			'activityHost': 'dd'
		});
		activity.save((err)=>{ // add activity
      		console.log('save status:', err ? 'failed' : 'success');
  		});
		res.json({name:'aaa',pwd:'123'});
	});
}
