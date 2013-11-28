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
    it('should calculate captured piece and capture it (c5)', function(){
      var board = new Board();
      board.initializeWith([{from:'a3', to: 'b4'},{from:'d6', to: 'c5'}]);
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"pos":"c5"') > 0);
      board.applyMove({from:'b4', to:'d6'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"pos":"c5"') < 0);
    });
    it('should crown pieces', function(){
      var board = new Board([ {color: 'W', pos: 'c7'}]);
      board.applyMove({from:'c7', to:'d8'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('isKing') > 0);
    });
    it('should calculate long captures', function(){
      var board = new Board([{color: 'W', pos: 'b2', isKing: true},{color: 'B', pos: 'e5'}]);
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"B"') > 0);
      board.applyMove({from:'b2', to:'f6'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"B"') < 0);

      var board = new Board([{color: 'W', pos: 'b2'},{color: 'B', pos: 'f6', isKing: true}]);
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"W"') > 0);
      board.applyMove({from:'f6', to:'a1'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"W"') < 0);
    
      var board = new Board([{color: 'W', pos: 'c7', isKing: true},{color: 'B', pos: 'f4'}]);
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"B"') > 0);
      board.applyMove({from:'c7', to:'g3'});
      assert.ok(JSON.stringify(board.currentBoard()).indexOf('"color":"B"') < 0);

    });
     it('should not allow multiple captures in one move', function(){
      var board = new Board([{color: 'W', pos: 'b2', isKing: true},{color: 'B', pos: 'e5'},{color: 'B', pos: 'd4'}]);
      var before = JSON.stringify(board.currentBoard());
      board.applyMove({from:'b2', to:'f6'});
      assert.equal(before, JSON.stringify(board.currentBoard()));
    });
  })
});