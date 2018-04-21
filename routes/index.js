 var ObjectID = require('mongodb').ObjectID;

// import models
var Activity = require('../models/activitys.js');
var ActivityClassify = require('../models/activityClassify.js');
var ActivitySet = require('../models/activitySet.js');

var schedule = require('node-schedule')
var rule = new schedule.RecurrenceRule();

　　var times = [];

　　for(var i=1; i<60; i++){

　　　　times.push(i);

　　}

　　rule.second = times;

　　var c=0;
　　var j = schedule.scheduleJob(rule, function(){
   　　 c++;
   　　console.log(c);
　　});

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
	app.post('/create', function (req, res) {
		let a = req.body.id,
			b = req.body.user,
			c = req.body.form.name,
			d = req.body.form.thost,
			e = req.body.form.classify,
			f = req.body.form.address,
			g = req.body.form.ds,
			h = req.body.form.de,
			i = req.body.form.tags,
			j = req.body.form.count,
			k = req.body.form.public,
			l = req.body.form.imageUrl,
			m = req.body.form.detail,
			n = req.body.form.settings,
			o = req.body.form.issue;
		var activity = new Activity({
			'id': a,
    		'user': b,
    		'name': c,
    		'thost': d,
    		'classify': e,
    		'address': f,
    		'ds': g,
    		'de': h,
    		'tags': i,
    		'count': j,
    		'public': k,
    		'imageUrl': l,
    		'detail': m,
    		'settings': n,
    		'issue': o
		});
		activity.save((err)=>{ // add activity
      		console.log('save status:', err ? 'failed' : 'success');
      		res.send('created');
  		});
	});
// create activity 

// list
	// search
	app.post('/getList', function (req, res) {
		let search = {user: req.body.params.user, id: req.body.params.id, issue: req.body.params.issue};
		if (req.body.params.classify) {
			search.classify = req.body.params.classify
		}
		if (req.body.params.searchW) {
			search.$or = [
				{name: {$regex:req.body.params.searchW}},
				{thost: {$regex:req.body.params.searchW}}
			]
		}
		Activity.find(search, function (err, result) {
			res.json(result)
		})
	})
	// delete
	app.post('/delActivity', function (req, res) {
		let _id = new ObjectID(req.body.params._id);
		let id = req.body.params.id;
		let user = req.body.params.user;
		Activity.remove({_id: _id, id: id, user: user}, function (error, docs) {
			res.send('delete');
		})
	})
// list

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
