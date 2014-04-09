angular.module('starter.login', [])

.controller('RootCtrl', function($scope, auth) {

    $scope.signin = function() {
        auth.signin({
          connection: 'Username-Password-Authentication',
          username: $scope.username,
          password: $scope.password
        });
    }

    $scope.signinWithGoogle = function() {
      auth.signin({
        connection: 'google-oauth2'
      });
    }
});