var io = require('../setup').io;

io.sockets.on('connection', function(socket){
	socket.on('movement', function(data){
		socket.broadcast.emit('update');
	});
});