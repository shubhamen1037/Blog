const express = require('express');

const router = express.Router();

const pingRoutes = require('./ping.js');
const healthCheckRoutes = require('./health-check');
const apiSpecRoutes = require('./api-spec');
const userRoutes = require('./user');
const loginRoutes = require('./login');
const registrationRoutes = require('./registration');
const postRoutes = require('./post');

pingRoutes(router);
healthCheckRoutes(router);
apiSpecRoutes(router);
userRoutes(router);
loginRoutes(router);
registrationRoutes(router);
postRoutes(router);

module.exports = router;
