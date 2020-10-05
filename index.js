var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

server.listen(PORT, function() {
  console.log('Chat server running');
});

var io = require('socket.io')(server);

io.use(async (socket, next) => {
  try {
    socket.userName = socket.handshake.query.userName;
    next();
  } catch (err) {}
});

io.on('connection', function(socket) {
  console.log('Подключился ' + socket.userName);

  socket.on('disconnect', () => {
    console.log('Отключился ' + socket.userName);
  })

  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});

app.get('/', (req, res) => {
  res.send('Лог чата');
})