const express = require('express');
const path = require('path');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

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

let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Home Route
app.get('/', function(req, res){
	Article.find({}, function(err, articles){
		if(err){
			console.log(err);
		} else {
			res.render('index', {
				title:'Articles',
				articles: articles
			});
		}	
	});
});

// Add Route
app.get('/articles/add', function(req, res){
	res.render('add_article', {
		title:'Add Article'
	});
});

// Add Submit Post Route
app.post('/articles/add', function(req, res){
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	article.save(function(err){
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/');
		}

	});
});


//start server
app.listen(3000, function(){
	console.log('Server started on port 3000...')
});