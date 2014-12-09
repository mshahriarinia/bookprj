'use strict';

module.exports = {
	db: 'mongodb://localhost/books',
	app: {
		title: 'Free Shipping Used Books(TM)'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'awesome.mail.ly@gmail.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'gmail.com',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'awesome.mail.ly@gmail.com',
				pass: process.env.MAILER_PASSWORD || 'test12345678'
			}
		}
	}
};
