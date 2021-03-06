var AuthenticationController = require('./controllers/authentication');
var express = require('express');
var passportService = require('../config/passport');
var passport = require('passport');
var listing = require('./controllers/listing')
var searchRestaurants = require('./controllers/searchRestaurants'); 

var requireAuth = passport.authenticate('jwt', {
    session: false
}),
requireLogin = passport.authenticate('local', {
    session: false
});

module.exports = function (app) {

    var authRoutes = express.Router();

    // Auth Routes
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.post('/list',listing.list);
    authRoutes.post('/search',searchRestaurants.search);
    


    // Set up routes
    app.use('/api', authRoutes);

}