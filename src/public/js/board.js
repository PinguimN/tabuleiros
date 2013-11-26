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
        {cor: 'B', pos: 'a1'},
        {cor: 'B', pos: 'c1'},
        {cor: 'B', pos: 'e1'},
        {cor: 'B', pos: 'g1'},
        {cor: 'B', pos: 'b2'},
        {cor: 'B', pos: 'd2'},
        {cor: 'B', pos: 'f2'},
        {cor: 'B', pos: 'h2'},
        {cor: 'B', pos: 'a3'},
        {cor: 'B', pos: 'c3'},
        {cor: 'B', pos: 'e3'},
        {cor: 'B', pos: 'g3'},
        {cor: 'P', pos: 'b8'},
        {cor: 'P', pos: 'd8'},
        {cor: 'P', pos: 'f8'},
        {cor: 'P', pos: 'h8'},
        {cor: 'P', pos: 'a7'},
        {cor: 'P', pos: 'c7'},
        {cor: 'P', pos: 'e7'},
        {cor: 'P', pos: 'g7'},
        {cor: 'P', pos: 'b6'},
        {cor: 'P', pos: 'd6'},
        {cor: 'P', pos: 'f6'},
        {cor: 'P', pos: 'h6'},
      ];
    },

    applyMove: function(move) {
      if(!move)
        return board;
      var piece = this.find(move.from);
      if (!piece || !this.isValidMove(move)) {
        //console.log("Movimento ilegal: " + JSON.stringify(move));
        return board;
      }
      
      piece.pos = move.to;
      if (move.capture) {
        var captured = this.find(move.capture);
        if (!captured) {
          console.log("captura ilegal: " + JSON.stringify(move));
          return board;
        }
        board.splice(board.indexOf(captured),1);
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

    emit: function(event, msg) {
      if(event == 'move')
        this.applyMove(msg);
    },

    isValidMove: function(move){
      var hasPieceOnDestination = this.find(move.to);
      return !hasPieceOnDestination && new Piece().isValidMove(move);
    }
  };

  var board = newBoard.initialize();

  return newBoard;

};

Piece = function(color){
  return  { isValidMove: function(move){
      var difX = move.to.charCodeAt(0) - move.from.charCodeAt(0);
      var difY = move.to[1] - move.from[1] * (color == 'B' ? -1 : 1);
      return Math.abs(difX) == 1 && difY == 1;
    }
  };
};

//pra fazer o js client-side testável
if(module !== 'undefined')
  module.exports = Board;