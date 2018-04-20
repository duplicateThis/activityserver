 var ObjectID = require('mongodb').ObjectID;

// import models
var Activity = require('../models/activitys.js');
var ActivityClassify = require('../models/activityClassify.js');
var ActivitySet = require('../models/activitySet.js');

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

// create activity 
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
// create activity 

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

// activity settings
	// add activity setting
	app.post('/addSettings', function (req, res) {
		let user = req.body.params.user;
		let id = req.body.params.id;
		let name = req.body.params.name;
		let state = true;
		var activitySet = new ActivitySet({
			'user': user,
			'id': id,
			'name': name,
			'state': state
		});
		activitySet.save((err) => {
			console.log('save status:', err ? 'failed' : 'success');
			res.send('success')
		})
	})
	// get activity settings
	app.post('/getSettings', function (req, res) {
		let user = req.body.params.user;
		let id = req.body.params.id;
		ActivitySet.find({
			user: user,
			id: id
		}, function (err, result) {
			res.json(result)
		})
	})
	// change setting state
	app.get('/changeState', function (req, res) {
		let user = req.query.user;
		let id = req.query.id;
		let _id = new ObjectID(req.query._id);
		let state = req.query.state;
		if(state == 'false') {
			ActivitySet.update({user: user, id: id, _id: _id}, {$set: {state: true}}, function (error) {
				res.send('success')
			})
		} else {
			ActivitySet.update({user: user, id: id, _id: _id}, {$set: {state: false}}, function (error) {
				res.send('success')
			})
		}
		
	})
	// edit activity settings
	app.get('/editSet', function (req, res) {
		let user = req.query.user;
		let id = req.query.id;
		let _id = new ObjectID(req.query._id);
		let name = req.query.name;
		ActivitySet.update({user: user, id: id, _id: _id}, {$set: {name: name}}, function (error) {
			res.send('success')
		})
	})
	// delete activity settings
	app.get('/delSet', function (req, res) {
		let user = req.query.user;
		let id = req.query.id;
		let _id = new ObjectID(req.query._id);
		ActivitySet.remove({user: user, id: id, _id: _id}, function (error, docs) {
			res.send('delete success');
		})
	})
// activity settings
	
// activity classify
	// get activity class 
	app.post('/getClass', function(req, res) {
		let user = req.body.params.user;
		let id = req.body.params.id;
		ActivityClassify.find({user: user, id: id}, function (err, result) {
			res.json(result)
		})
	})
	// add activity class 
	app.post('/addClass', function (req, res) {
		let user = req.body.params.user;
		let id = req.body.params.id;
		let name = req.body.params.name;
		var activityClassify = new ActivityClassify({
			'user': user,
			'id': id,
			'name': name
		});
 		activityClassify.save((err) => {
			console.log('save status:', err ? 'failed' : 'success');
			res.send('success')
		})
	})
	// edit activity class
	app.get('/editClass', function (req, res) {
		let user = req.query.user;
		let id = req.query.id;
		let _id = new ObjectID(req.query._id);
		let name = req.query.name;
		ActivityClassify.update({_id: _id}, {$set: {name: name}}, function (error) {
			res.send('success')
		})
	})
	// delete activity class
	app.get('/delClass', function (req, res) {
		let user = req.query.user;
		let id = req.query.id;
		let _id = new ObjectID(req.query._id);
		ActivityClassify.remove({user: user, id: id, _id: _id}, function (error, docs) {
			res.send('delete success');
		})
	})
// activity classify
}
