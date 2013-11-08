var app = require('../setup').app;

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:id', function(req, res) {
  res.render('game');
});