var http = require('http');
var mongoose = require('mongoose');

var app = exports.app = require('./config/express');
var server = http.createServer(app);
var io = exports.io = require('./config/socketio')(server);

mongoose.connect('localhost/damas');

require('./models/game');
require('./controllers/routes_controller');
require('./controllers/sockets_controller');

server.listen(app.get('port'), function() {
  console.log('Damas listening on port %d', app.get('port'));
});