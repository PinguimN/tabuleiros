var Renderer = function(canvas, board, listener) {
  var allListeners =Array.prototype.slice.call(arguments).splice(2);

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
    var destino = String.fromCharCode(x + 97) + y;    
    listener.emit('move', {
      from: pieceTaken,
      to: destino,
      color: board.find(pieceTaken).color
    });
  });

  var drawSquare = function(x, y, black) {
    context.fillStyle = black? '#555' : '#FFF';
    var xPixel = x*cellSize;
    var yPixel = y*cellSize;
    context.fillRect(xPixel,yPixel,xPixel + cellSize,yPixel + cellSize);
  };

  var drawPiece = function(x, y, black) {
    context.fillStyle = black? '#000' : '#AAA';
    context.strokeStyle = black? '#FFF' : '#000';
    context.beginPath();
    context.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 0.8 * cellSize/2, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
  };

  var drawKing = function(x, y, black) {
    context.fillStyle = black? '#000' : '#AAA';
    context.strokeStyle = black? '#FFF' : '#000';
    context.beginPath();
    context.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2 - cellSize / 10, 0.8 * cellSize/2, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.closePath();
  };

  var drawGame = function() {
    var black = true;
    for (x = 0; x < 9; x ++)
      for (y = 0; y < 9; y ++)
        drawSquare(x, y, (black = !black));
    var currentBoard = board.currentBoard();
    for (piece in currentBoard) {
      var x = currentBoard[piece].pos[0].charCodeAt(0) - 97;//char intValue
      var y = 8 - currentBoard[piece].pos[1];
      drawPiece(x, y, currentBoard[piece].color == 'B');
      if(currentBoard[piece].isKing)
        drawKing(x,y,currentBoard[piece].color == 'B');
    }
  };

  return {drawGame: drawGame};

}