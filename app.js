var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var swig = require('swig');
var Sequelize = require('sequelize');
var models = require('./models');
var routes = require('./routes');

// var db = new Sequelize('postgres://localhost:5432/wikistack'); //Create connection to db

var app = express(); //Create new server


app.use(morgan('dev'));
app.use('/', routes);


// app.use(function(req,res,next){
// 	res.send();
// })

models.db.sync({})
.then(function(content){
	// console.log(content);
	app.listen(3000)
})
.catch(function(err) {
	console.error(err)
})






app.use(express.static('public'));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});



// app.get('/', function(req, res, next){
// 	console.log('You have reached port 3000');
// 	res.render('index', {} );
// });


