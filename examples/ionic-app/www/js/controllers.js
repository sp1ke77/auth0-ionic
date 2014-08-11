angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth,) {
  auth.signin({
    popup: true
  }, function() {
    $state.go('tab.dash');
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})


.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
