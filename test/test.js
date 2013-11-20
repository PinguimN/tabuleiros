var assert = require("assert");
var Board = require("../src/model/board");
describe('Array', function(){
  describe('calculateBoard with new game', function(){
    it('should return initial config board', function(){
      var board = Board.calculateBoard({moves: []});
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
})
