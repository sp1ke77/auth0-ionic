angular.module('starter.tabs', [])

.controller('DashCtrl', function($scope, auth) {

})

.controller('AccountCtrl', function($scope, auth, $state) {

  $scope.logout = function() {
    auth.signout();
    $state.go('root');
  }

});
