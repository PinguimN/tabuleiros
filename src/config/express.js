var express = require('express');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

if ('development' == app.get('env')) {
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
}