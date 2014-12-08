var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var verifyCredentials = function(username, password, done) {
		console.log('HERE ------> local strategy')
		if (username === 'admin' && password === 'lynda') {
			return done(null, {username: 'admin'});
		}
		return done(null, false);
	}

passport.use(new LocalStrategy(verifyCredentials));


// to store user information to the session
passport.serializeUser(function(user, done) {
	console.log('serializeUser')
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	console.log('deserializeUser')
	done(null, {username: username});
});

module.exports = passport;