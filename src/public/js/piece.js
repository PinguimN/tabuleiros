MoveDiff = function(){
  return {
    diffX: function(a, b){
      if(!b){
        b = a.to;
        a = a.from;
      }
      return b.charCodeAt(0) - a.charCodeAt(0);
    },
    diffY: function(a, b){
      if(!b){
        b = a.to;
        a = a.from;
      }
      return (b[1] - a[1]);
    }
  };
};

Piece = function(color){ //TODO: Refactor ffs
  var differ = new MoveDiff();
  return  { 
    isValidMove: function(move) {
      if(move.capture)
        return this.isValidCapture(move);
      var difY = differ.diffY(move) * (color == 'B' ? -1 : 1);
      return Math.abs(differ.diffX(move)) == 1 && difY == 1;
    },
    isValidCapture: function(move) {
      return this.isValidCaptee(move) && Math.abs(differ.diffX(move)) == 2 && Math.abs(differ.diffY(move)) == 2;
    },
    isValidCaptee: function(move) {
      return Math.abs(differ.diffX(move.capture, move.from)) == 1 && Math.abs(differ.diffY(move.capture, move.from)) == 1 
            && Math.abs(differ.diffX(move.capture, move.to)) == 1 && Math.abs(differ.diffY(move.capture, move.to)) == 1;
    }
  };
};

King = function(color) {
  var differ = new MoveDiff();
  return {
    isValidMove: function(move) {
      var isValidMove = Math.abs(differ.diffX(move)) == Math.abs(differ.diffY(move));
      if(move.capture)
        return this.isValidCapture(move) && isValidMove;
      return isValidMove;
    },
    isValidCapture: function(move) {
      return this.isValidCaptee(move) && Math.abs(differ.diffX(move.to, move.capture)) == 1 && Math.abs(differ.diffY(move.to, move.capture)) == 1;
    },
    isValidCaptee: function(move) {
      return Math.abs(differ.diffX(move.capture, move.from)) == Math.abs(differ.diffY(move.capture, move.from));
    }
  };
};

//pra fazer o js client-side testável
if(exports !== 'undefined'){
  exports.Piece = Piece;
  exports.King = King;
}
  