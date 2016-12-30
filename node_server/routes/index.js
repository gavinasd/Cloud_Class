var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret:"thisIsSecret",
  userProperty:'payload'
});
var usersController = require('../controllers/usersController');
var ctrlAuth = require('../controllers/authentication');
var coursesController = require('../controllers/courseController');

router.get('/user/:id',auth,usersController.readOneUser);

//authentication
router.post('/register',ctrlAuth.register);
//course

router.post('/login',ctrlAuth.login);
router.get('/courses/:userId',auth,coursesController.getCourseListByUserId);

module.exports = router;
