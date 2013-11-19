var boardSize = 500;
var cellSize = boardSize/8;

drawBoard = function(ctx){
	
	var black = true;
	for(x = 0; x < 9; x ++)		
		for(y = 0; y < 9; y ++)
			drawSquare(ctx, x, y, (black = !black));
	
}

drawSquare = function(ctx, x, y, black){
	ctx.fillStyle = black? "#555" : "#FFF";
	var xPixel = x*cellSize;
	var yPixel = y*cellSize;
	ctx.fillRect(xPixel,yPixel,xPixel + cellSize,yPixel + cellSize);

}

drawPiece = function(ctx, x,y, black){
	ctx.fillStyle = black? "#000" : "#AAA";
	ctx.beginPath();
    ctx.arc(x*cellSize+cellSize/2, y*cellSize+cellSize/2, 0.8*cellSize/2, 0, 2 * Math.PI, false);
	ctx.fill();
}

drawGame = function(){
	var myCanvas = document.getElementById("tabuleiro");
	var ctx = myCanvas.getContext("2d");
	
	drawBoard(ctx);

	var aGame = [{ cor: 'B', pos: 'a1'},
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
	
	for(piece in aGame){
		var x = aGame[piece].pos[0].charCodeAt(0) - 97;//char intValue
		var y = 8 - aGame[piece].pos[1];
		drawPiece(ctx, x,y, aGame[piece].cor == 'P');
	}
}

window.onload = drawGame;
