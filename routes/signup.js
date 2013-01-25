var mongo = require('mongodb');

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
	auto_reconnect : true
});

db = new Db('users', server, {
	w : 0,
	native_parser : true
});

db.open(function(err, db) {
	if (!err) {
		console.log('Connected to user database "users"');
		db.collection('users', function(err, collection) {
			if (err) {
				console.log('The "users" collections does not exist, creating it');
				populateDB();
			} else {
				console.log('err: ' + err);
			}
			collection.find().toArray(function(err,items){
				if (items.length == 0) {
					console.log('The "users" collections is empty filling it');
					populateDB();
				} else {
					console.log('The users has '+items.length+' entries.');
				}
			});
		});
	} else {
		console.log('err: ' + err);
	}
});

exports.findAll = function(req, res) {
	console.log('findAll users');
	db.collection('users', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		})
	})
};

exports.findById = function(req, res) {
	console.log('findById user');
	var id = req.params.id;
	console.log('findById id: ' + id);
	db.collection('users', function(err, collection) {
		collection.findOne({
			'_id' : new BSON.ObjectID(id)
		}, function(err, item) {
			res.send(item);
		});
	});
};

exports.addUser = function(req, res) {
	console.log('addUser');
	var user = req.body;
	console.log('addUser id: ' + JSON.stringify(user));
	db.collection('users', function(err, collection) {
		collection.insert(user, function(err, result) {
			if (err) {
                res.send({'error':'An error when adding user ' +err});
           } else {
           		console.log('Added user '+JSON.stringify(result[0]));
                res.send(result[0]);
           }          
		});
	});
};

exports.updateUser = function(req, res) {
	console.log('updateUser');
	var user = req.body;
	var id = req.params.id;
	console.log('updateUser id: '+id +', data ' + JSON.stringify(user));
	db.collection('users', function(err, collection) {
		collection.update({'_id': new BSON.ObjectID(id)}, { $set : user}, function(err, result) {
			if (err) {
				 res.send({'error':'An error when updating user ' +err});
			} else {
				console.log('Updated '+result+' documents.');
				res.send(user);
			}
		}); 
	});
};

exports.deleteUser = function(req, res) {
	console.log('deleteUser');
	var id = req.params.id;
	console.log('deleteUser id: '+id);
	db.collection('users', function(err, collection) {
		collection.remove({'_id': new BSON.ObjectID(id)}, function(err, result) {
			if (err) {
				res.send({'error':'An error when deleting user ' +err})
			} else {
				console.log('Deleted '+result+' documents.');
				res.send(req.body);
			}
		})
	});
	
};

var populateDB = function() {
	var users = [{
		name : 'Toni',
		email : 'toni@t.com',
		password : 'secret'
	}, {
		name : 'Someone',
		email : 'someone@s.com',
		password : 'some'
	}, {
		name : 'John',
		email : 'john@doe.com',
		password : 'doe'
	}];

	db.collection('users', function(err, collection) {
		collection.insert(users, {
			safe : true
		}, function(err, result) {
		});
	})
};
