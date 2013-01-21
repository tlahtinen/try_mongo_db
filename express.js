var express = require('express'), 
	path = require('path'), 
	http = require('http'),
	users = requires('./routes/signup.js');

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 8011);
	app.use(express.bodyParser());
});

/*
app.get('/', users.findAll());
app.post('/', users.add());
*/
app.listen(8001);
