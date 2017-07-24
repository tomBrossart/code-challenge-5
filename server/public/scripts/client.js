var myApp = angular.module('myApp', []); //plug in dependencies in array

myApp.controller('MessageController', function($http, $scope) {
  console.log("client js firing");

  $scope.post = {
    message: '',
    name: ''
  };

  getMessages();

  $scope.addMessage = function(input) {
    $http.post('/message', input).then(function(response) {
      console.log(response.data);
    });
    getMessages();
  };

  function getMessages() {
    $http.get('/message').then(function(response){
      console.log(response.data);
    $scope.dbMessages = response.data;
  });
}

});
