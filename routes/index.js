var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var swig = require('swig');
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', function(req, res, next){
	res.render('index');
	// res.redirect('/')
});

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    date: Date()
  });

  var user = User.build({
  	name: req.body.name,
  	email: req.body.email
  })

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  user.save()
  .then(function(response){
  	console.log(page);
  	return page.save();
  }).then(function(response){
  	res.redirect(response.route);
  }).catch(function(err){
  	console.error(err)
  });
  // -> after save -> res.redirect('/');
});

router.get('/add', function(req,res,next){
	res.render('addpage');
});


router.get('/:url', function(req,res,next) {
	var query = Page.findAll ({
		where: {
			urlTitle: req.params.url
		}
	});
	query.then(function(result) {
		res.body = result[0].dataValues
		console.log(res.body)
		res.render('wikipage',{page: res.body});
	});
	
})


// module.exports = { 
// 	router: router
// }


module.exports = router;