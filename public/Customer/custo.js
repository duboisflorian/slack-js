app.directive('navBar',function(channelFactory,userFactory,$q){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'Customer/custo.html',
    controller:function($scope){

    $('.bs-example-modal-lg').modal('show');

    $scope.closeModal = function closeModal(){
      $scope.$parent.newUser($scope.name);
      $('.bs-example-modal-lg').modal('hide');
    };

    }
  }
});
