// var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var axios = require('axios');

require('dotenv').config();

app.use(express.static(__dirname + '/public'));


let api = process.env.API;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/book.html');
});

io.on('connection', function(socket){
  socket.on('search', function(msg) {
    io.emit('load');
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + msg + '&key=' + api;
    axios.get(url)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        io.emit('loaded');
        io.emit('searched', response.data['items']);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
  socket.on('content', id => {
    let url = "https://www.googleapis.com/books/v1/volumes/" + id
    axios.get(url)
      .then(function(response) {
        io.emit('book', response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
  console.log('server live at http://localhost:' + port);
});
