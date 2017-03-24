app.controller('slackCtrl', function($scope,channelFactory,$q) {
  $scope.channel=1;


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
          socket.emit('chat' + $scope.channel, $scope.message, heurescomplete, $scope.channel);
          $scope.message = '';
        }

        socket.on('chat' + $scope.channel, function(msg, heures, id){
          $scope.messages.push({contenu: msg, heure: heures});
          $scope.$apply();
          console.log("tableau de messages", $scope.messages);
        });

        $scope.changerChannel = function(id){
            socket.removeAllListeners();
            $scope.messages = [];
            $scope.channel=id;
            socket.on('chat' + $scope.channel, function(msg, heures, id){
              $scope.messages.push({contenu: msg, heure: heures});
              $scope.$apply();
              console.log("tableau de messages", $scope.messages);
            });
        }

});
