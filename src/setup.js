var http = require('http');

var app = exports.app = require('./config/express');
var server = http.createServer(app);
var io = exports.io = require('./config/socketio')(server);
var Game = exports.Game = require('./model/game');

require('./controllers/routes_controller');
require('./controllers/sockets_controller');

server.listen(app.get('port'), function() {
  console.log('Damas listening on port %d', app.get('port'));
});