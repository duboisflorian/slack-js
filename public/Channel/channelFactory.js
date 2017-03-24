app.factory('channelFactory', function($http){
return { getAllChannels:function(){
  return $http.get('http://localhost:3000/channels');
}
}


});
