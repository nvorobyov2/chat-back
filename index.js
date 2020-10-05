var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

server.listen(PORT, function() {
  console.log('Chat server running');
});

const io = require('socket.io')(server);

io.use(async (socket, next) => {
  try {
    socket.userName = socket.handshake.query.userName;
    next();
  } catch (err) {}
});

let log;

io.on('connection', function(socket) {
  console.log('Подключился ' + socket.userName);
  log = '<p>Подключился ' + socket.userName + '</p>';

  socket.on('disconnect', () => {
    console.log('Отключился ' + socket.userName);
    log = '<p>Отключился ' + socket.userName + '</p>';
  })

  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});

app.get('/', (req, res) => {
  res.send('<p>Лог чата</p>' + log);
})