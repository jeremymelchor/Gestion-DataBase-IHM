'use strict';

/**
 * @ngdoc overview
 * @name test2IhmApp
 * @description
 * # test2IhmApp
 *
 * Main module of the application.
 */
angular
  .module('test2IhmApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCTRL'
      })
      .when('/moreInfo/:userId', {
        templateUrl: 'views/moreInfo.html',
        controller: 'MoreInfoCTRL'
      })
      .when('/userAndRole/:projectId', {
        templateUrl: 'views/userAndRole.html',
        controller: 'UserAndRoleCTRL'
      })
      .otherwise({
        redirectTo: '/'
      });


  });
