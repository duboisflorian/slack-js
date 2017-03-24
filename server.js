var express = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connection = mysql.createConnection({
  host     : 'mysql-slack-js.alwaysdata.net',
  user     : 'slack-js',
  password : 'yani123',
  database : 'slack-js_project'
});

  connection.connect();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  socket.on('chat_message', function(msg, heures){
    io.emit('chat_message', msg, heures);
    connection.query("INSERT INTO message VALUES (NULL,'" + msg +" ', '" + heures +"')", function(err, rows, fields) {
      if (err) throw err;
      console.log('Message ajouté à ' + heures);
    });
    console.log('Message envoye : ' + msg);
  });
});

app.get('/channels',function(req,res){

  connection.query('SELECT * from Channel ' ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
