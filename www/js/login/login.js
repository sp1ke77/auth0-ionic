angular.module('starter.login', ['starter.services'])

.controller('RootCtrl', function($scope, auth, Loading, $state, $ionicPopup) {
  $scope.model = {};

    function onLoginSuccess () {
      $state.go('tab.dash').finally(function() {
        Loading.stop();
      });
    }

    function onLoginFailure (err) {
      var message = (err.details && err.details.error_description) || err.message;
      Loading.stop();
      $ionicPopup.alert({
        title: message
       });
    }

    $scope.signin = function() {
        auth.signin({
          connection: 'Username-Password-Authentication',
          username: $scope.model.username,
          password: $scope.model.password
        }, onLoginSuccess, onLoginFailure);
        Loading.start();
    };

    $scope.signinWithGoogle = function() {
      auth.signin({
        connection: 'google-oauth2',
        popup: true
      }, onLoginSuccess, onLoginFailure);
      Loading.start();
    };
});
