'use strict';

/**
 * @ngdoc function
 * @name test2IhmApp.controller:MoreInfoCTRL
 * @description
 * # MoreInfoCTRL
 * Controller of the test2IhmApp
 */
angular.module('test2IhmApp')
  .controller('MoreInfoCTRL', function($scope, $http, $routeParams) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.users = data.data;
      });

    if ($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
          }
        });
    }

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.projects = data.data;
      });

    if ($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId +'/Projects')
        .success(function (data) {
          if (data.status == "success") {
            $scope.projectUser = data.data;
          }
        });
    }
  });
