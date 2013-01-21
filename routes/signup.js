var mongo = require('mongodb'),
	
var Db = mongo.Db;
	Server = mongo.Server;
	
var server = new Server('localhost', 27017, {auto-connect: true});
var db = new Db('tt', server, {safe: true});

db.open(function(err, db) {
	if (!err) {
		console.log('Connected to tt database');
		db.collection('users', function(err, collection) {
			if (err) {
				console.log('Users does not exist');
			}
		}); 
	}
});

	

