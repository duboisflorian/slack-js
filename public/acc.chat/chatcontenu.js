app.directive('chatContenu',function(){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'acc.chat/acc.chat.html',
    controller:function($scope){
      $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          var date = new Date();
          var heure = date.getHours();
          var minute = date.getMinutes();
          var message  = "[" + heure + ":" + minute + "] : " + msg;
          $('#messages').append($('<li>').text(message));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
    }
  }

});
