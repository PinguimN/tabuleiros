var boardSize = 500;
var cellSize = boardSize/8;

var gameId = document.getElementById('gameId').value;
var socket = io.connect();

var board = new Board();

var renderer = new Renderer(
  document.getElementById('tabuleiro'),
  board,
  socket,
  board
);

socket.emit('init', gameId, prompt('Qual seu nome?'));

socket.on('start', function(game) {
  $('#players').html(game.p1 + ' X ' + game.p2);
  board.initializeWith(game.moves);
  renderer.drawGame();
});

socket.on('spectators', function(spectators) {
  $('#spectators').html('');
  spectators.forEach(function(spectator) {
    $('#spectators').append('<li>' + spectator + '</li>');
  });
});

socket.on('update', function updateBoard(move) {
  board.applyMove(move);
  renderer.drawGame();
});