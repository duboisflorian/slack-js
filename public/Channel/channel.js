app.directive('channelList',function(channelFactory,$q){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'Channel/channel.html',
    controller:function($scope){

      function asyncGreet() {
        // perform some asynchronous operation, resolve or reject the promise when appropriate.
        return $q(function(resolve, reject) {
          setTimeout(function() {
            if (okToGreet()) {
              resolve(channelFactory.getAllChannels());
            } else {
              reject();
            }
          }, 1000);
        });
      }

      var promise = asyncGreet();
      promise.then(function(greeting) {
        $scope.channels = greeting;
        $scope.active = $scope.channels.data[0].id;
      }, function(reason) {
        alert('Failed: ' + reason);
      });

      function okToGreet(){
        return true;
      }

      $scope.changerFocus = function changerFocus(id){
        $scope.active=id;
      };

    }
  }
});
