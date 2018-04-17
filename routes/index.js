// import models
var Activity = require('../models/activitys.js');
var ActivityClassify = require('../models/activityClassify.js');

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

	// get activity class router
	app.get('/getClass', function(req, res) {
		var user = req.query.user;
		ActivityClassify.find({user: user}, function (err, result) {
			res.json(result)
		})
	});

	// add activity class router
	app.get('/addClass', function (req, res) {
		var user = req.query.user;
		var activityClassName = req.query.activityClassName;
		if (activityClassName != '') {
			var activityClassify = new ActivityClassify({
				'user': user,
				'activityClassName': activityClassName
			});
			activityClassify.save((err)=>{
      			console.log('save status:', err ? 'failed' : 'success');
  			});
		}
		
	});

	// creater activity router
	app.post('/create', function (req, res) {
		let a = req.body.id,
			b = req.body.user,
			c = req.body.form.number,
			d = req.body.form.name,
			e = req.body.form.thost,
			f = req.body.form.valueClassify,
			g = req.body.form.selectedAreaOptions,
			h = req.body.form.dateStart,
			i = req.body.form.dateEnd,
			j = req.body.form.activityTags,
			k = req.body.form.peopleCount,
			l = req.body.form.activityRadio,
			m = req.body.form.imageUrl,
			n = req.body.form.detail,
			o = req.body.form.settings,
			p = req.body.form.issue;
		var activity = new Activity({
			'id': a,
    		'user': b,
    		'number': c,
    		'name': d,
    		'thost': e,
    		'Classify': f,
    		'address': g,
    		'ds': h,
    		'de': i,
    		'tags': j,
    		'count': k,
    		'public': l,
    		'imageUrl': m,
    		'detail': n,
    		'settings': o,
    		'issue': p
		});
		activity.save((err)=>{ // add activity
      		console.log('save status:', err ? 'failed' : 'success');
  		});
	});
}
