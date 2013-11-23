var Renderer = function(canvas, listener) {

  var context = canvas.getContext('2d');
  var pieceTaken = null;

  canvas.addEventListener('mousedown', function(evt) {
    var x = Math.floor(evt.offsetX / cellSize);
    var y = -Math.floor(evt.offsetY / cellSize) + 8;
    pieceTaken = String.fromCharCode(x + 97) + y;
  });

  canvas.addEventListener('mouseup', function(evt) {
    var x = Math.floor(evt.offsetX / cellSize);
    var y = -Math.floor(evt.offsetY / cellSize) + 8;
    var destino = String.fromCharCode(x + 97) + y ;

    listener.emit('move', {from: pieceTaken, to: destino});
    // drawGame();
    // TODO: realizar o movimento na tela
  });

  var drawSquare = function(x, y, black) {
    context.fillStyle = black? '#555' : '#FFF';
    var xPixel = x*cellSize;
    var yPixel = y*cellSize;
    context.fillRect(xPixel,yPixel,xPixel + cellSize,yPixel + cellSize);
  };

  var drawPiece = function(x, y, black) {
    context.fillStyle = black? '#000' : '#AAA';
    context.beginPath();
    context.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 0.8 * cellSize/2, 0, 2 * Math.PI, false);
    context.fill();
  };

  var drawGame = function(board) {
    var black = true;
    for (x = 0; x < 9; x ++)
      for (y = 0; y < 9; y ++)
        drawSquare(x, y, (black = !black));

    for (piece in board) {
      var x = board[piece].pos[0].charCodeAt(0) - 97;//char intValue
      var y = 8 - board[piece].pos[1];
      drawPiece(x, y, board[piece].cor == 'P');
    }
  };

  return {drawGame: drawGame};

}