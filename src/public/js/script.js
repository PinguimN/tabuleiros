var socket = io.connect();

socket.on('welcome', function(message) {
  alert(message);
});