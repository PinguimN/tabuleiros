var boardSize = 500;
var cellSize = boardSize/8;

var gameId = document.getElementById('gameId').value;
var socket = io.connect();

var renderer = new Renderer(
  document.getElementById('tabuleiro'),
  socket
);

var board = new Board();

function updateBoard(moves) {
  console.log('moves! ' + moves);
  renderer.drawGame(board.calculate(moves));
}

socket.emit('init', gameId, updateBoard);
socket.on('update', updateBoard);