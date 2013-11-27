var assert = require("assert");
var Board = require("../public/js/board");

describe('Board', function(){
  describe('calculateBoard with new game', function(){
    it('should return initial config board', function(){
      var board = new Board().initializeWith({moves: []});
      var expected = [{ color: 'W', pos: 'a1'},
       { color: 'W', pos: 'c1'},
       { color: 'W', pos: 'e1'},
       { color: 'W', pos: 'g1'},
       { color: 'W', pos: 'b2'},
       { color: 'W', pos: 'd2'},
       { color: 'W', pos: 'f2'},
       { color: 'W', pos: 'h2'},
       { color: 'W', pos: 'a3'},
       { color: 'W', pos: 'c3'},
       { color: 'W', pos: 'e3'},
       { color: 'W', pos: 'g3'},
       { color: 'B', pos: 'b8'},
       { color: 'B', pos: 'd8'},
       { color: 'B', pos: 'f8'},
       { color: 'B', pos: 'h8'},
       { color: 'B', pos: 'a7'},
       { color: 'B', pos: 'c7'},
       { color: 'B', pos: 'e7'},
       { color: 'B', pos: 'g7'},
       { color: 'B', pos: 'b6'},
       { color: 'B', pos: 'd6'},
       { color: 'B', pos: 'f6'},
       { color: 'B', pos: 'h6'},

       ];
      for(piece in board){
        assert.equal(expected[piece].color, board[piece].color);
        assert.equal(expected[piece].pos, board[piece].pos);
      }
    })
  })
});

describe('Board', function(){
  describe('#applyMove', function(){
    assert.board = function(expected, produced){
      for(piece in produced){
        assert.equal(expected[piece].color, produced[piece].color);
        assert.equal(expected[piece].pos, produced[piece].pos);
      }
    };
    it('should ignore moves to occupied squares', function(){
      var boardBeforeIllegalMove = new Board().currentBoard();
      var boardAfterIllegalMove = new Board().applyMove({from:'a1' ,to:'b2'});
      assert.board(boardBeforeIllegalMove, boardAfterIllegalMove);
    });
    it('should calculate captured piece', function(){
      var board = new Board();
      board.initializeWith([{from:'a3', to: 'b4'},{from:'d6', to: 'c5'}]);
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"pos":"c5"') > 0);
      board.applyMove({from:'b4', to:'d6'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"pos":"c5"') < 0);
    });
  })
});

describe('Piece', function(){
  describe('#isValidMove', function(){
    it('should refuse long moves', function(){
      assert.equal(false, new Piece().isValidMove({from: 'a1', to: 'a5'}));
    });
    it('should refuse horizontal moves', function(){
      assert.equal(false, new Piece().isValidMove({from: 'a1', to: 'a2'}));
    });
    it('should refuse vertical moves', function(){
      assert.equal(false, new Piece().isValidMove({from: 'a1', to: 'b1'}));
    });
    it('should accept simple moves', function(){
      assert.equal(true, new Piece('W').isValidMove({from: 'a1', to: 'b2'}));
      assert.equal(true, new Piece('B').isValidMove({from: 'b2', to: 'a1'}));
    });
    it('should refuse backward moves', function(){
      assert.equal(false, new Piece('B').isValidMove({from: 'a1', to: 'b2'}));
      assert.equal(false, new Piece('W').isValidMove({from: 'b2', to: 'a1'}));
    });
    it('should accept forward and backward captures', function(){
      assert.equal(true, new Piece().isValidMove({from: 'a1', to: 'c3', capture: 'b2'}));
      assert.equal(true, new Piece().isValidMove({from: 'c3', to: 'a1', capture: 'b2'}));
    });
    it('should refuse captures with invalid captee', function(){
      assert.equal(false, new Piece().isValidMove({from: 'a1', to: 'c3', capture: 'c3'}));
      assert.equal(false, new Piece().isValidMove({from: 'c3', to: 'a1', capture: 'd2'}));
    });
  });
});