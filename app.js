const express = require('express');
const path = require('path');
const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');

let db =  mongoose.connection;

// Check Connection
db.once('open', function(){
	console.log('Connected to MongoDB');
});


//Check DB for Errors
db.on('error', function(err){
	console.log(err);
});

// Init App
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function(req, res){
	let articles =[
		{
			id:1,
			title:"Article One",
			author:"Nick",
			body:"This is article One"
		},
		{
			id:2,
			title:"Article Two",
			author:"Brad",
			body:"This is article Two"
		},
		{
			id:3,
			title:"Article Three",
			author:"Brian",
			body:"This is article Three"
		}
	];
	res.render('index', {
		title:'Articles',
		articles: articles
	});
});

// Add Route
app.get('/articles/add', function(req, res){
	res.render('add_article', {
		title:'Add Articles'
	});
});


//start server
app.listen(3000, function(){
	console.log('Server started on port 3000...')
});