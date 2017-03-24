app.directive('chatContenu',function(){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'acc.chat/acc.chat.html',
    controller:function($scope){
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
        socket.emit('chat_message', $scope.message, heurescomplete);
        $scope.messages.push({contenu: $scope.message, heure: heurescomplete});
        $scope.message = '';
      }

      socket.on('chat_message', function(msg){
        console.log("tableau de messages", $scope.messages);
      });
      // $(function () {
      //   var socket = io();
      //   $('form').submit(function(){
      //     socket.emit('chat message', $('#m').val());
      //     $('#m').val('');
      //     return false;
      //   });
      //   socket.on('chat message', function(msg){
      //     var date = new Date();
      //     var heure = date.getHours();
      //     var minute = date.getMinutes();
      //     var message  = "[" + heure + ":" + minute + "] : " + msg;
      //     $('#messages').append($('<li>').text(message));
      //     window.scrollTo(0, document.body.scrollHeight);
      //   });
      // });
    }
  }

});
