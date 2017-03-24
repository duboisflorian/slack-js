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
  socket.on('name' , function(name){
    io.emit('name' , name);
    });
  });

connection.query('SELECT * from Channel ' ,function(err, rows, fields) {
    if (err) throw err;

    // boucle pour émission de message en fonction du channel
    rows.forEach(function(channel){
      io.on('connection', function(socket){
        socket.on('chat' + channel.id, function(msg, heures, id,name){
          io.emit('chat' + id, msg, heures, id,name);
          connection.query("INSERT INTO message VALUES (NULL,'" + msg +" ', '" + heures + " ', '" + id + " ', '" + name  + "')", function(err, rows, fields) {
            if (err) throw err;
            console.log('Message ajouté à ' + heures);
          });
          console.log('Message envoye : ' + msg);
        });
      });
    })
});

app.get('/channels',function(req,res){

  connection.query('SELECT * from Channel ' ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

app.delete('/userdelete/:nale',function(req,res){

  connection.query('delete from user where pseudo =' + req.params.name ,function(err, rows, fields) {
      if (err) throw err;

      res.send("user delete");
});

})

app.get('/users',function(req,res){

  connection.query('SELECT * from user ' ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

app.get('/lastmessages/:id',function(req,res){

connection.query('SELECT * FROM  message where idchannel = ' + req.params.id +' ORDER BY id DESC LIMIT 10 ' ,function(err, rows, fields) {
      if (err) throw err;

      res.json(rows);
});

})

app.post('/newuser/:name',function(req,res){

connection.query("INSERT INTO user VALUES (NULL,'" + req.params.name +  "')",function(err, rows, fields) {
      if (err) throw err;

      res.send("user created");
});

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
