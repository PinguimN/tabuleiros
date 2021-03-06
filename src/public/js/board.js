if(typeof Piece == 'undefined')
  Piece = require('./piece').Piece;

Board = function(currentState) {
  
  var newBoard = {
    
    currentBoard: function(){
      return board;
    },

    currentPlayer: function(){
      return currentPlayerIsWhite ? 'W' : 'B';
    },

    initializeWith: function(moves) {
      moves = moves || [];
      for (i = 0; i < moves.length; i++) {
        var move = moves[i];
        this.applyMove(move);
      }
      return board;
    },

    initialize: function() {
      return [
        {color: 'W', pos: 'a1'},
        {color: 'W', pos: 'c1'},
        {color: 'W', pos: 'e1'},
        {color: 'W', pos: 'g1'},
        {color: 'W', pos: 'b2'},
        {color: 'W', pos: 'd2'},
        {color: 'W', pos: 'f2'},
        {color: 'W', pos: 'h2'},
        {color: 'W', pos: 'a3'},
        {color: 'W', pos: 'c3'},
        {color: 'W', pos: 'e3'},
        {color: 'W', pos: 'g3'},
        {color: 'B', pos: 'b8'},
        {color: 'B', pos: 'd8'},
        {color: 'B', pos: 'f8'},
        {color: 'B', pos: 'h8'},
        {color: 'B', pos: 'a7'},
        {color: 'B', pos: 'c7'},
        {color: 'B', pos: 'e7'},
        {color: 'B', pos: 'g7'},
        {color: 'B', pos: 'b6'},
        {color: 'B', pos: 'd6'},
        {color: 'B', pos: 'f6'},
        {color: 'B', pos: 'h6'},
      ];
    },

    applyMove: function(move) {
      if(!move)
        return board;
      var piece = this.find(move.from);
      this.detectCapture(move);
      if (!piece || !this.isValidMove(piece, move)) {
        console.log('Movimento ilegal!');
        return board;
      }
      
      piece.pos = move.to;
      if(this.isCrowning(piece)){
        piece.isKing = true;
      }

      if (move.capture) {
        var capture = this.find(move.capture);
        if (!capture) {
          console.log('Captura ilegal!');
          return board;
        }
        board.splice(board.indexOf(capture),1);
      }
      currentPlayerIsWhite = !currentPlayerIsWhite;
      return board;
    },

    find: function(position) {
      for (pieceIndex in board) {
        var piece = board[pieceIndex];
        if (piece.pos == position) {
          return piece;
        }
      }
      return null;
    },

    detectCapture: function(move){ //Altera o move... ok?
      var piecesInPath = [];
      var diffX = Math.abs(move.to[1] - move.from[1]);
      var signalY = diffX / (move.to[1] - move.from[1]);
      var signalX = Math.abs(move.to.charCodeAt(0) - move.from.charCodeAt(0)) / (move.to.charCodeAt(0) - move.from.charCodeAt(0));
      for(var i = 1; i < diffX; i++){
        x = move.from.charCodeAt(0) + i * signalX;
        y = parseInt(move.from[1]) + i * signalY;
        var piece = this.find(String.fromCharCode(x) + y);
        if(piece)
          piecesInPath.push(piece);
      }
      if(piecesInPath.length == 1)
        move.capture = piecesInPath[0].pos;
      else if(piecesInPath.length > 1)
        move.capture = 'ILLEGAL';
    },
    isCrowning: function(piece){
      return piece.color == 'B' ? piece.pos[1] == 1 : piece.pos[1] == 8;
    },
    emit: function(event, msg) {
      if(event == 'move')
        this.applyMove(msg);
    },

    isValidMove: function(piece, move){
      var hasPieceOnDestination = this.find(move.to);
      var isPlayerTurn = this.currentPlayer() == piece.color;
      var pieceLogic = piece.isKing ? new King(piece.color) : new Piece(piece.color);
      return isPlayerTurn && !hasPieceOnDestination && pieceLogic.isValidMove(move);
    }
  };

  var board = currentState || newBoard.initialize();
  var currentPlayerIsWhite = true;
  return newBoard;

};

//pra fazer o js client-side testável
if(typeof module !== 'undefined')
  module.exports = Board;