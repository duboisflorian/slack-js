app.factory('messagesFactory', function($http){
return { getLastsMessages:function(id){
  return $http.get('http://localhost:3000/lastmessages/' + id);
}
}


});
