'use strict'
var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup', { title: 'SIMS - Welcome to School Management System' , layout: 'preLoginLayout'});
 
}

exports.signin = function(req, res) {
 
    res.render('signin', { title: 'SIMS - Welcome to School Management System' , layout: 'preLoginLayout'});
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard', { title: 'Dashboard' , layout: 'template'});
 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}