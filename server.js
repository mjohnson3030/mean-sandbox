var express 	= require('express');
var app			= express();
var connect 	= require('connect');
var mongoose	= require('mongoose');
var dbConfig 	= require('./config/database');

mongoose.connect(dbConfig.url);

app.use(connect.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());


require('./routes/routeTable')(app);

app.listen(3000);