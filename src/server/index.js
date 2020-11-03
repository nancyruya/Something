var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + JSON.stringify(msg));
        io.emit('chat message', msg);
      });
  });
  

http.listen(process.env.PORT, '0.0.0.0')