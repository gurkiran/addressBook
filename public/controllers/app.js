var myApp = angular.module('myApp',[]);

myApp.controller('mainController',['$scope', '$http', function($scope,$http){

$scope.sortField = 'name';
$scope.reverse = true;

var refresh = function(){
  $http.get('/contactList').success(function(response){
    $scope.contacts = response;

    $scope.contact ='';
  });
}

refresh();

  $scope.addContact = function(){
    var cont = $scope.contact;
    if( Object.keys(cont).length < 3){
      alert('Please enter details !');
    } else {
      $http.post('/contactList', $scope.contact).success(function(response){

        refresh();
      });
    }
    }

$scope.remove = function(id){
   $http.delete('/contactList/'+id).success(function(response){
     refresh();
   });
}

$scope.edit = function(id){
  console.log(id);
  $http.get('/contactList/'+id).success(function(response){
    $scope.contact=response;
  });
}

$scope.update = function(){
  console.log($scope.contact._id);
  console.log($scope.contact);
  $http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(response){
    refresh();
  });
}

}]);
