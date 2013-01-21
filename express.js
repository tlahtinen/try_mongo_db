/**var express = require('express');
 var mongodb = require('mongodb');
 var app = express();

 var Db = mongodb.Db;
 var connection = mongodb.Connection;
 var server = mongodb.Server;

 var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
 var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : connection.DEFAULT_PORT;

 app.get('/', function(req, res) {
 console.log('Connecting to ' + host + ':' + port);

 var response = 'response';
 var db = new Db('tt', new server(host, port, {}), {
 w : 0,
 native_parser : true
 });

 db.open(function(err, db) {
 console.log('open ' + err + ', err');

 db.collection('users', function(err, collection) {
 console.log('users');
 var cursor = collection.find({});
 cursor.toArray(function(err, docs) {
 response = 'daaa';
 console.log('toArray err:' + err + ', documents:' + docs.length);
 });
 });
 db.close();
 });

 res.send('Hello from express! response:' +response+'\n');
 });
 */
var express = require('express');
var app = express();
app.get('/', function(req, res) {
	var Db = require('mongodb').Db, Connection = require('mongodb').Connection, Server = require('mongodb').Server;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('tt', new Server(host, port, {}), {
		native_parser : true
	});
	db.open(function(err, db) {
		db.collection('test', function(err, collection) {

			// Remove all existing documents in collection
			collection.remove(function(err, result) {

				// Insert 3 records
				for (var i = 0; i < 3; i++) {
					collection.insert({
						'a' : i
					});
				}

				// Show collection names in the database
				db.collectionNames(function(err, names) {
					names.forEach(function(name) {
						console.dir(name);
					});
				});

				// More information about each collection
				db.collectionsInfo(function(err, cursor) {
					cursor.toArray(function(err, items) {
						items.forEach(function(item) {
							console.dir(item);
						});
					});
				})
				// Index information
				db.createIndex('test', 'a', function(err, indexName) {
					db.indexInformation('test', function(err, doc) {
						console.dir(doc);
						collection.drop(function(err, result) {
							db.close();
						});
					});
				});
			});
		});
	});

});
app.listen(8001);
