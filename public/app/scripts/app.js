'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [
 {
   name: 'base',
   state: {
       abstract: true,
       url: '',
       templateUrl: 'views/base.html',
       data: {
           text: "Base",
           visible: false
       }
   }
 }, {
   name: 'login',
   state: {
       url: '/login',
       parent: 'base',
       templateUrl: 'views/login.html',
       controller: 'LoginCtrl',
       data: {
           text: "Login",
           visible: false
       }
   }
 }, {
   name: 'dashboard',
   state: {
       url: '/dashboard',
       parent: 'base',
       templateUrl: 'views/dashboard.html',
       controller: 'DashboardCtrl',
       data: {
           text: "Dashboard",
           visible: false
       }
   }
 }, {
   name: 'overview',
   state: {
       url: '/overview',
       parent: 'dashboard',
       templateUrl: 'views/dashboard/overview.html',
       data: {
           text: "Overview",
           visible: true
       }
   }
 }, {
   name: 'reports',
   state: {
       url: '/reports',
       parent: 'dashboard',
       templateUrl: 'views/dashboard/reports.html',
       data: {
           text: "Reports",
           visible: true
       }
   }
 }, {
   name: 'logout',
   state: {
       url: '/login',
       data: {
           text: "Logout",
           visible: true
       }
   }
 }
];
   
angular.
  module('yapp', [
      'ui.router',
      'snap',
      'ngAnimate',
      'ngCookies',
      'Authentication'
  ]).
  config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('/dashboard', '/dashboard/overview');
      $urlRouterProvider.otherwise('/login');
      
      angular.forEach(states, function (state) {
          $stateProvider.state(state.name, state.state);
      });
  }).
  run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
  ]);
