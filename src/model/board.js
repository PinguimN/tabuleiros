exports.calculateBoard = function(game){
	var board = initialBoard();
	console.log(game);
	console.log(game.moves);
	for(i = 0; i< game.moves.length; i++){
		var move = game.moves[i];
		applyMove(board, move);
	}
	return board;
}

initialBoard = function(){
	return [{ cor: 'B', pos: 'a1'},
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
}

applyMove = function(board, move){
	var piece = find(board, move.origem);
	if(piece == null) {
		console.log("Movimento ilegal: " + JSON.stringify(move));
		return;
	}
	
	piece.pos = move.destino;
	if(move.captura){
		var captured = find(board, move.captura);
		board.splice(board.indexOf(captured),1);
	}
}

find = function(board, position){
	for(pieceIndex in board){
		var piece = board[pieceIndex];
		if(piece.pos == position)
			return piece;
	}
	return null;
}