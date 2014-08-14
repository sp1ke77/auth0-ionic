angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth, $state) {
  auth.signin({
    popup: true,
    // Make the widget non closeable
    standalone: true,
    // This asks for the refresh token
    // So that the user never has to log in again
    offline_mode: true
  }, function() {
    $state.go('tab.dash');
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})


.controller('DashCtrl', function($scope, $http) {

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  }
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
