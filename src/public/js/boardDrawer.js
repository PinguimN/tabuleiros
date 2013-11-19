var boardSize = 500;
var cellSize = boardSize/8;
var gameId;

var socket;

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
var pieceTaken = null; //TODO: dar um jeito de tirar essa global(?)
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
	$.getJSON("/calculateBoard/" + gameId, function(data){
		drawGamea(data);
	});
}

initializeGame = function(){
	gameId = document.getElementById('gameId').value;
	socket = io.connect();
	socket.on('update', function(message){
		console.log('UPDATE REQUESTED BY SERVER');
		drawGame();
	});
	drawGame();

	var myCanvas = document.getElementById("tabuleiro");

	myCanvas.addEventListener('mousedown',function(evt){
		var x = Math.floor(evt.offsetX / cellSize);
		var y = -Math.floor(evt.offsetY / cellSize) + 8;
		pieceTaken = String.fromCharCode(x+97)+y;
	});

	myCanvas.addEventListener('mouseup',function(evt){
		var x = Math.floor(evt.offsetX / cellSize);
		var y = -Math.floor(evt.offsetY / cellSize) + 8;
		var cor = "L";//Não está precisando da cor
		var destino = String.fromCharCode(x+97)+y ;
		$.getJSON("/"+gameId+"/" + pieceTaken +"/" + destino +"/" + cor , function(data){
			socket.emit('movement', {gameId : gameId});
			drawGame();
		});
	});
}

window.onload = initializeGame;
