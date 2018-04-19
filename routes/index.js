 var ObjectID = require('mongodb').ObjectID;

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
	// edit class
	app.get('/editClass', function (req, res) {
		let user = req.query.user;
		let nowClass = req.query.val1;
		let updateClass = req.query.val2;
		res.send('edeit');
		ActivityClassify.update({
			user: user,
			activityClassName: nowClass
		}, {
			$set: {
				activityClassName: updateClass
			}
		}, function (error) {})	
	})
	// delete class
	app.get('/deleteClass', function (req, res) {
		let user = req.query.user;
		let val = req.query.val;
		res.send('delete');
		ActivityClassify.remove({
			user: user,
			activityClassName: val
		}, function (error) {})
	})

	// creater activity router
	app.post('/create', function (req, res) {
		let a = req.body.id,
			b = req.body.user,
			c = req.body.form.number,
			d = req.body.form.name,
			e = req.body.form.thost,
			f = req.body.form.classify,
			g = req.body.form.address,
			h = req.body.form.ds,
			i = req.body.form.de,
			j = req.body.form.tags,
			k = req.body.form.count,
			l = req.body.form.public,
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
    		'classify': f,
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
  		res.send('create');
	});

	// get activity list
	app.get('/getList', function (req, res) {
		let search = {user: req.query.user, id: req.query.id, issue: req.query.issue};
		if (req.query.classify) {
			search.classify = req.query.classify
		}
		if (req.query.searchW) {
			search.$or = [
				{name: {$regex:req.query.searchW}},
				{thost: {$regex:req.query.searchW}}
			]
		}
		Activity.find(search, function (err, result) {
			res.json(result)
		})
	})

	// delete activity
	app.get('/delActivity', function (req, res) {
		let id = new ObjectID(req.query.id)
		Activity.remove({_id: id}, function (error, docs) {
			res.send('delete');
		})
	})
}
