// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
  'starter.tabs', 'starter.login', 'starter.services',
  'auth0', 'authInterceptor', 'ngCookies'])

.run(function($ionicPlatform, $rootScope, $state, auth,
  AUTH_EVENTS, Loading) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

   // Auth0 login events
   $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      // When Auth0 login success
      $state.go('tab.dash').finally(function() {
        Loading.stop();
      });
    });
    $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
      // When Auth0 login fails
      $state.go('root', {error: true}).finally(function() {
        Loading.stop();
      });
    });

    // This function checks for the `requiresLogin` flag.
    // If it's true, if checks that the user is authenticated
    $rootScope.$on('$stateChangeStart', function(e, to) {
      if (to.data && to.data.requiresLogin) {
        if (!auth.isAuthenticated) {
          e.preventDefault();
          $state.go('root');
        }
      }
    });
    
})

.config(function($stateProvider, $urlRouterProvider, authProvider, 
  $httpProvider) {

  // First we need to configure authProvider to be able to 
  // use Auth0 Login. Please enter your information here.
  // Further info on https://github.com/auth0/auth0-angular#client-side-authentication
  authProvider.init({
    domain: 'mgonto.auth0.com',
    clientID: 'CoXRnOhBltFTJw9TJxys5dcto2p3Ow6g',
    callbackURL: 'http://localhost:8001/',
    callbackOnLocationHash: true
  });

  // Ionic uses AngularUI Router which uses the concept of states
  $stateProvider

    // Setup main state so that the user can Login to the app
    .state('root', {
      url: "/?error",
      templateUrl: "templates/root.html",
      controller: "RootCtrl"
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      data: {
        requiresLogin: true
      }
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might 
  // want to check the delegation-token example
  $httpProvider.interceptors.push('authInterceptor');

});

