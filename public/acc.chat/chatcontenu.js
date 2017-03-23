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
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
    }
  }

});
