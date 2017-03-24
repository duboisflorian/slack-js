app.directive('navBar',function(channelFactory,$q){
  return{
    restrict:'E',
    scope: true,
    templateUrl:'Customer/custo.html',
    controller:function($scope){

    $('.bs-example-modal-lg').modal('show');

    $scope.closeModal = function closeModal(){
      $('.bs-example-modal-lg').modal('hide');
    };

    }
  }
});
