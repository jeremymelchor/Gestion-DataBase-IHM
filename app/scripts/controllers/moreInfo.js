'use strict';

/**
 * @ngdoc function
 * @name test2IhmApp.controller:MoreInfoCTRL
 * @description
 * # MoreInfoCTRL
 * Controller of the test2IhmApp
 */
angular.module('test2IhmApp')
  .controller('MoreInfoCTRL', function ($scope, $http, $routeParams, $location) {



    /************ Récupération des Users ***********/

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.users = data.data;
      })
      .error(function () {
        document.getElementById("broken").innerHTML = "<div class='alert alert-danger'>." +
        "<strong>ERREUR !</strong> Le serveur est peut être down, réessayez plus tard</div>";
      });

    if ($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
        .success(function (data) {
          if (data.status == "success") {
            $scope.currentUser = data.data;
          }
        });
    }



    /************** Récupération des Roles ******************/

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function (data) {
        $scope.role = data.data;
      })
      .error(function () {
        document.getElementById("broken").innerHTML = "<div class='alert alert-danger'>." +
        "<strong>ERREUR !</strong> Le serveur est peut être down, réessayez plus tard</div>";
      });

    if ($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Roles')
        .success(function (data) {
          if (data.status == "success") {
            $scope.userRoles = data.data;
          }
        });
    }



    /***************** Récupération des Projets *******************/

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function (data) {
        $scope.projects = data.data;
      })
      .error(function () {
        document.getElementById("broken").innerHTML = "<div class='alert alert-danger'>." +
        "<strong>ERREUR !</strong> Le serveur est peut être down, réessayez plus tard</div>";
      });

    if ($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId + '/Projects')
        .success(function (data) {
          if (data.status == "success") {
            $scope.projectUser = data.data;

            $scope.projectUser.getRole = function (userId, projectId) {
              for (var i = 0; i < $scope.userRoles.length; i++) {
                if ($scope.userRoles[i].ProjectId == projectId) {
                  return $scope.userRoles[i].name;
                }
              }
            };
          }
        });
    }




    /************ Méthode de rootage *****************/

    $scope.goToAccueil = function () {
      $location.path('/');
    };

  });
