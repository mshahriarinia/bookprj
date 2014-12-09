'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var userModel = require('../models/user.server.model');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);