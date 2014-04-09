angular.module('starter.login', ['starter.services'])

.controller('RootCtrl', function($scope, auth, Loading) {

    $scope.signin = function() {
        auth.signin({
          connection: 'Username-Password-Authentication',
          username: $scope.username,
          password: $scope.password
        });
        Loading.start();
    }

    $scope.signinWithGoogle = function() {
      auth.signin({
        connection: 'google-oauth2'
      });
      Loading.start();
    }
});