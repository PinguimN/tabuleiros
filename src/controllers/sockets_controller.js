var io = require('../setup').io;

io.sockets.on('movement', function(socket){
	io.sockets.emit('update');
});

io.sockets.on('subscribe', function(socket){
	console.log('SUBSCRIBE >>>>>>>>>>>>>>' + socket);
});