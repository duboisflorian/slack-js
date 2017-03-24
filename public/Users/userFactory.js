app.factory('userFactory', function($http){
return { getAllUsers:function(){
  return $http.get('http://localhost:3000/users');
},
newUser:function(name){
  return $http.post('http://localhost:3000/newuser/' + name);
}
,
deleteUser:function(name){
  return $http.delete('http://localhost:3000/deleteuser/' + name);
}
}


});
