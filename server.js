//#!/usr/bin/env
'use strict';
require('dotenv').config(); //option : {silent: true} load variables from .env file
var server = require('./app');
var port = process.env.PORT || 8000;
server.listen(port, function() {
  console.log('Server running now on port: %d', port);
});
