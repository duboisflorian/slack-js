app.directive('userList',function(userFactory,$q){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'Users/user.html',
    controller:function($scope){

      function asyncGreet() {
        // perform some asynchronous operation, resolve or reject the promise when appropriate.
        return $q(function(resolve, reject) {
          setTimeout(function() {
            if (okToGreet()) {
              resolve(userFactory.getAllUsers());
            } else {
              reject();
            }
          }, 1000);
        });
      }

      var promise = asyncGreet();
      promise.then(function(greeting) {
        $scope.users = greeting.data;
      }, function(reason) {
        alert('Failed: ' + reason);
      });

      function okToGreet(){
        return true;
      }

    }
  }

});
