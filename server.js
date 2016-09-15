#!/usr/bin/env node

var express = require('express');
var vhost = require('vhost');
var debug = require('debug')('server');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();

// Each website should be an express.js app located in a sub-directory
// and have a field "vhosts" which should be an array of the hostnames to be used.

var dirs = getSubDirectories(__dirname);
for (dir of dirs) {
  var package = parsePackageDotJson(dir);
  if (package && package.main) {
    var sub_app = require("./" + dir + "/" + package.main);
    for (hostname of sub_app.vhosts) {
      app.use(vhost(hostname, sub_app));
      debug(dir + ": using vhost '" + hostname + "'");
    }
  }
}

var port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || 3000);
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.set('port', port);
app.set('ip', ip);

var server = http.createServer(app);
server.listen(port, ip);

server.on('error', onError);
server.on('listening', onListening);


function getSubDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function parsePackageDotJson(dir) {
  var package = null;
  try {
    var file = path.join(__dirname, dir, 'package.json');
    package = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (exception) {
    debug(dir + ": unable to parse package.json");
  }
  return package;
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
