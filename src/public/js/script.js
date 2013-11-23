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

socket.emit('init', gameId, function updateBoard(moves) {
  board.initializeWith(moves);
  renderer.drawGame();
  var moveString = "";
  for(i in moves)//tem como sobrescrever o tostring dos move?
  	moveString += '[' + moves[i].from + ',' + moves[i].to + ']';
  document.getElementById('movesP').innerHTML = moveString;
});
socket.on('update', function updateBoard(move) {
  board.applyMove(move);
  renderer.drawGame();
  document.getElementById('movesP').innerHTML += '[' + move.from + ',' + move.to + ']';
});