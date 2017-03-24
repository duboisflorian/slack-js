app.factory('channelFactory', function($http){
return { getAllChannels:function(){
  return $http.get('http://localhost:3000/channels');
},
addChannel:function(nom){
  return $http.post('http://localhost:3000/addchannel/' + nom);
}
}


});
