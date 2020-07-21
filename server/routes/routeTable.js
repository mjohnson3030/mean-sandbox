var index = require('./index');
var database = require('../config/database');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {
	app.get('/', index.index);

	// routes to manage 'person' index
	app.get('/person/:id', (req, res) => {
		getSandboxClient()
			.then(db => {
				db.collection('people')
					.findOne({ _id: ObjectId(req.params.id) })
					.then(result => {
						res.send(result);
					})
					.catch(err => {
						throw err;
					})
			})
			.catch(err => {
				throw err;
			})
	});

	app.delete('/person/:id', (req, res) => {
		getSandboxClient()
			.then(db => {
				db.collection('people')
					.deleteOne({ _id: ObjectId(req.params.id) })
					.then(result => {
						res.send(result);
					})
					.catch(err => {
						throw err;
					})
			})
	});

	app.get('/person', (req, res) => {
		getSandboxClient()
			.then(db => {
				db.collection('people').find().toArray(function(err, result) {
					if (err) throw err;
					res.send(result);
				})
			})
	});

	app.put('/person', (req, res) => {
		if (!req.body.first || !req.body.last) {
			throw Error('Invalid request');
		}
		getSandboxClient()
			.then(db => {
				db.collection('people').insertOne(req.body, function(err, result) {
					if (err) throw err;
					res.send(result);
				})
			})
	});

	app.post('/person/:id', (req, res) => {
		var newData = {
			$set: {}
		};

		if (req.body.first) {
			newData.$set.first = req.body.first;
		}

		if (req.body.last) {
			newData.$set.last = req.body.last;
		}

		if (!newData.$set.first && !newData.$set.last) {
			throw Error('No updates');
		}

		getSandboxClient()
			.then(db => {
				db.collection('people').updateOne({ _id: ObjectId(req.params.id) }, newData, function(err, result) {
					if (err) throw err;
					res.send(result);
				})
			})
	});
};

function getSandboxClient() {
	return new Promise((resolve, reject) => {
		MongoClient.connect(database.url, function (err, client) {
			if (err) reject(err);
			resolve(client.db('sandbox'));
		});
	});
}
