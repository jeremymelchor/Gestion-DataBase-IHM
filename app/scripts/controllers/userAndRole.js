'use strict';

/**
 * @ngdoc function
 * @name test2IhmApp.controller:UserAndRoleCTRL
 * @description
 * # UserAndRoleCTRL
 * Controller of the test2IhmApp
 */
angular.module('test2IhmApp')
  .controller('UserAndRoleCTRL', function($scope, $http, $routeParams) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.users = data.data;
      });

    if ($routeParams.projectId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentProject = data.data;
          }
        });
    }

  });
