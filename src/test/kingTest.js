var assert = require("assert");
var Board = require("../public/js/piece");

describe('King', function(){
  describe('#isValidMove', function(){
    it('should accept long moves', function(){
      assert.equal(true, new King().isValidMove({from: 'a1', to: 'e5'}));
      assert.equal(true, new King().isValidMove({from: 'e5', to: 'a1'}));
    });
    it('should accept long captures', function(){
      assert.equal(true, new King().isValidMove({from: 'a1', to: 'e5', capture: 'd4'}));
      assert.equal(true, new King().isValidMove({from: 'e5', to: 'b2', capture: 'c3'}));
    });
    it('should refuse long captures landing far from captee', function(){
      assert.equal(false, new King().isValidMove({from: 'a1', to: 'f6', capture: 'd4'}));
      assert.equal(false, new King().isValidMove({from: 'e5', to: 'a1', capture: 'c3'}));
    });
    it('should refuse long captures with captee out of path', function(){
      assert.equal(false, new King().isValidMove({from: 'a1', to: 'e5', capture: 'd2'}));
      assert.equal(false, new King().isValidMove({from: 'e5', to: 'b2', capture: 'd2'}));
    });
  });
});