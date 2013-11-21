var Board = function() {

  return {

    calculate: function(moves) {
      var board = this.initialize();
      moves = moves || [];
      for (i = 0; i < moves.length; i++) {
        var move = moves[i];
        this.applyMove(board, move);
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

    applyMove: function(board, move) {
      var piece = find(board, move.from);
      var chara = move.to.charCodeAt(0) - 96;
      if (!piece || (chara + parseInt(move.to[1])) % 2 != 0) {
        console.log("Movimento ilegal: " + JSON.stringify(move));
        return;
      }
      
      piece.pos = move.to;
      if (move.capture) {
        var captured = find(board, move.capture);
        if (!captured) {
          console.log("captura ilegal: " + JSON.stringify(move));
          return;
        }
        board.splice(board.indexOf(captured),1);
      }
    },

    find: function(board, position) {
      for (pieceIndex in board) {
        var piece = board[pieceIndex];
        if (piece.pos == position) {
          return piece;
        }
      }
      return null;
    }

  };

}