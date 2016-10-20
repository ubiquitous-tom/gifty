'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', 
    function($scope, $rootScope, $location, AuthenticationService) {
      AuthenticationService.ClearCredentials();

      $scope.login = function() {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
          if(response.success) {
            AuthenticationService.SetCredentials($scope.username, $scope.password);
            $location.path('/dashboard');
          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        });
      }
      // $scope.submit = function() {

      //   $location.path('/dashboard');

      //   return false;
      // }

    }
  ]);
