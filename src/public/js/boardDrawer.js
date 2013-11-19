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

drawGamea = function(aGame){
	var myCanvas = document.getElementById("tabuleiro");
	var ctx = myCanvas.getContext("2d");
	drawBoard(ctx);
	
	for(piece in aGame){
		var x = aGame[piece].pos[0].charCodeAt(0) - 97;//char intValue
		var y = 8 - aGame[piece].pos[1];
		drawPiece(ctx, x,y, aGame[piece].cor == 'P');
	}
}

drawGame = function(){
	$.getJSON("/calculateBoard/528b6bdc30477e18c439ed1e", function(data){
		drawGamea(data);
	});
}

window.onload = drawGame;
