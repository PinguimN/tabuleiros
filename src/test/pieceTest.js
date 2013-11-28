var assert = require("assert");
var Board = require("../public/js/piece");

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