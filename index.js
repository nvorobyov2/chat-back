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
  console.log('Подключился ' + socket.handshake.query.userName);
  const p = document.createElement('p');
  p.textContent = 'Подключился ' + socket.handshake.query.userName;
  document.getElementById('log').appendChild(p);

  socket.on('disconnect', () => {
    console.log('Отключился ' + socket.handshake.query.userName);
    const p = document.createElement('p');
    p.textContent = 'Отключился ' + socket.handshake.query.userName;
    document.getElementById('log').appendChild(p);
  })

  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile(index.html);
})