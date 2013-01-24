var express = require('express'),
	path = require('path'), 
	users = require('./routes/signup.js');

var app = express();

app.configure(function() {
	/* 'default', 'short', 'tiny', 'dev' */
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/users', users.findAll);
//app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.listen(8011);
console.log('Listening on port 8011');
