app.controller('slackCtrl', function($scope,channelFactory,userFactory,messagesFactory,$q) {
  $scope.channel=1;
  $scope.user="";


  function asyncGreet() {
    // perform some asynchronous operation, resolve or reject the promise when appropriate.
    return $q(function(resolve, reject) {
      setTimeout(function() {
        if (okToGreet()) {
          resolve(messagesFactory.getLastsMessages($scope.channel));
        } else {
          reject();
        }
      }, 1000);
    });
  }

  function okToGreet(){
    return true;
  }

  var promise = asyncGreet();
  promise.then(function(greeting) {
    $scope.messages = greeting.data.reverse();
  }, function(reason) {
    alert('Failed: ' + reason);
  });

  var socket = io();
  $scope.messages = [];
  $scope.getHeureNow = function(){
    var date = new Date();
    var heure = date.getHours();
    if (heure<10) {heure = "0" + heure}
    var minute = date.getMinutes();
    if (minute<10) {minute = "0" + minute}
    var heurescomplete  = heure + ":" + minute;
    return heurescomplete;
  }
  $scope.envoyerMessage = function(){
    var heurescomplete = $scope.getHeureNow();
    socket.emit('chat' + $scope.channel, $scope.message, heurescomplete, $scope.channel,$scope.user);
    $scope.message = '';
  }

  $scope.newUser = function(name){
      $scope.user=name;
      userFactory.newUser(name);
  }

  socket.on('chat' + $scope.channel, function(msg, heures, id,name){
    $scope.messages.push({contenu: msg, date: heures, name:name});
    $scope.$apply();
    console.log("tableau de messages", $scope.messages);
  });

  $scope.changerChannel = function(id){
    socket.removeAllListeners();
    $scope.messages = [];
    $scope.channel=id;
    var promise = asyncGreet();
    promise.then(function(greeting) {
      $scope.messages = greeting.data.reverse();
    }, function(reason) {
      alert('Failed: ' + reason);
    });
    socket.on('chat' + $scope.channel, function(msg, heures, id,name){
      $scope.messages.push({contenu: msg, date: heures, name:name});
      $scope.$apply();
      console.log("tableau de messages", $scope.messages);
    });
  }

});
