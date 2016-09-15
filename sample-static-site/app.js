var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.vhosts = [
  /* update hosts file to point the names below to 127.0.0.1 */
  'localhost',
  'sample-domain-name.com'
];

module.exports = app;
