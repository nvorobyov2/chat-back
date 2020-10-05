var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

server.listen(PORT, function() {
  console.log('Chat server running');
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  const userName = socket.handshake.query.userName;
  console.log('Подключился ' + userName);

  socket.on('disconnect', () => {
    console.log('Отключился ' + userName);
  })

  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile(index.html);
})