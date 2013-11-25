var assert = require("assert");
var Board = require("../public/js/board");

console.log(Board);

describe('Board', function(){
  describe('calculateBoard with new game', function(){
    it('should return initial config board', function(){
      var board = new Board().initializeWith({moves: []});
      var expected = [{ cor: 'B', pos: 'a1'},
       { cor: 'B', pos: 'c1'},
       { cor: 'B', pos: 'e1'},
       { cor: 'B', pos: 'g1'},
       { cor: 'B', pos: 'b2'},
       { cor: 'B', pos: 'd2'},
       { cor: 'B', pos: 'f2'},
       { cor: 'B', pos: 'h2'},
       { cor: 'B', pos: 'a3'},
       { cor: 'B', pos: 'c3'},
       { cor: 'B', pos: 'e3'},
       { cor: 'B', pos: 'g3'},

       { cor: 'P', pos: 'b8'},
       { cor: 'P', pos: 'd8'},
       { cor: 'P', pos: 'f8'},
       { cor: 'P', pos: 'h8'},
       { cor: 'P', pos: 'a7'},
       { cor: 'P', pos: 'c7'},
       { cor: 'P', pos: 'e7'},
       { cor: 'P', pos: 'g7'},
       { cor: 'P', pos: 'b6'},
       { cor: 'P', pos: 'd6'},
       { cor: 'P', pos: 'f6'},
       { cor: 'P', pos: 'h6'},

       ];
      for(piece in board){
        assert.equal(expected[piece].cor, board[piece].cor);
        assert.equal(expected[piece].pos, board[piece].pos);
      }
    })
  })
});

describe('Board', function(){
  describe('#applyMove', function(){
    assert.board = function(expected, produced){
      for(piece in produced){
        assert.equal(expected[piece].cor, produced[piece].cor);
        assert.equal(expected[piece].pos, produced[piece].pos);
      }
    };
    it('should ignore moves to occupied squares', function(){
      var boardBeforeIllegalMove = new Board().currentBoard();
      var boardAfterIllegalMove = new Board().applyMove({from:'a1' ,to:'b2'});
      assert.board(boardBeforeIllegalMove, boardAfterIllegalMove);
    });
    it('should ignore moves to black squares', function(){
      var boardBeforeIllegalMove = new Board().currentBoard();
      var boardAfterIllegalMove = new Board().applyMove({from:'a1' ,to:'a2'});
      assert.board(boardBeforeIllegalMove, boardAfterIllegalMove);
    });
    it('should ignore moves to out of range squares', function(){
      var boardBeforeIllegalMove = new Board().currentBoard();
      var boardAfterIllegalMove = new Board().applyMove({from:'a1' ,to:'a5'});
      assert.board(boardBeforeIllegalMove, boardAfterIllegalMove);
    });
  })
});