Board = function() {
  
  var newBoard = {
    
    currentBoard: function(){
      return board;
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
        //console.log("Movimento ilegal: " + JSON.stringify(move));
        return board;
      }
      
      piece.pos = move.to;
      if (move.capture) {
        var capture = this.find(move.capture);
        if (!capture) {
          console.log("captura ilegal: " + JSON.stringify(move));
          return board;
        }
        board.splice(board.indexOf(capture),1);
      }
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
      var difX = move.to.charCodeAt(0) - move.from.charCodeAt(0);
      var difY = move.to[1] - move.from[1];
      if(Math.abs(difX) != 2 || Math.abs(difY) != 2)
        return;
      var captured = String.fromCharCode(move.to.charCodeAt(0) - difX / 2) + (parseInt(move.from[1]) + difY / 2);
      move.capture = captured;
    },

    emit: function(event, msg) {
      if(event == 'move')
        this.applyMove(msg);
    },

    isValidMove: function(piece, move){
      var hasPieceOnDestination = this.find(move.to);
      return !hasPieceOnDestination && new Piece(piece.color).isValidMove(move);
    }
  };

  var board = newBoard.initialize();

  return newBoard;

};

Piece = function(color){ //TODO: Refactor ffs
  return  { 
    isValidMove: function(move){
      if(move.capture)
        return this.isValidCapture(move);
      var difX = move.to.charCodeAt(0) - move.from.charCodeAt(0);
      var difY = (move.to[1] - move.from[1]) * (color == 'B' ? -1 : 1);
      return Math.abs(difX) == 1 && difY == 1;
    },
    isValidCapture: function(move){
      var difX = move.to.charCodeAt(0) - move.from.charCodeAt(0);
      var difY = (move.to[1] - move.from[1]);
      return this.isValidCaptee(move) && Math.abs(difX) == 2 && Math.abs(difY) == 2;
    },
    isValidCaptee: function(move){
      var difX = move.from.charCodeAt(0) - move.capture.charCodeAt(0);
      var difY = (move.from[1] - move.capture[1]);
      var difX2 = move.to.charCodeAt(0) - move.capture.charCodeAt(0);
      var difY2 = (move.to[1] - move.capture[1]);
      return Math.abs(difX) == 1 && Math.abs(difY) == 1 && Math.abs(difX2) == 1 && Math.abs(difY2) == 1;
    }
  };
};

//pra fazer o js client-side testável
if(module !== 'undefined')
  module.exports = Board;