'use strict';

/**
 * @ngdoc function
 * @name test2IhmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the test2IhmApp
 */
angular.module('test2IhmApp')
  .controller('MainCTRL', function ($scope, $http, $location) {



    /******************** Récupération des données *******************/

    $http.get("http://poo-ihm-2015-rest.herokuapp.com/api/Users")
      .success(function (data) {
        $scope.data = data.data;
      })
      .error(function () {
        document.getElementById("broken").innerHTML = "<div class='alert alert-danger'>." +
        "<strong>ERREUR !</strong> Le serveur est peut être down, réessayez plus tard</div>";
      });

    $http.get("http://poo-ihm-2015-rest.herokuapp.com/api/Projects")
      .success(function (data) {
        $scope.projects = data.data;
      });



    /******************** Actions sur les Users *******************/

    /**
     * Met à jour un utilisateur
     *
     * @param id l'Id de l'utilisateur
     * @param newName Son nouveau nom
     * @param newSurname Son nouveau prénom
     * @param newEmail Son nouveau mail
     * @param newWebsite Son nouveau site
     */
    $scope.updateUser = function (id, newName, newSurname, newEmail, newWebsite) {
      var user = {};
      user.name = newName;
      user.surname = newSurname;
      user.email = newEmail;
      user.website = newWebsite;
      $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Users/" + id, user);
    };

    /**
     * Crée un utilisateur
     *
     * @param newName Le nouveau nom
     * @param newSurname Le nouveau prénom
     * @param newMail Le nouveau mail
     * @param newWebsite Le nouveau site web
     */
    $scope.createUser = function (newName, newSurname, newMail, newWebsite) {
      var user = {};
      user.name = newName;
      user.surname = newSurname;
      user.email = newMail;
      user.website = newWebsite;
      $http.post("http://poo-ihm-2015-rest.herokuapp.com/api/Users", user);
    };

    /**
     * Supprime un utilisateur
     *
     * @param id L'id de l'utilisateur à supprimer
     */
    $scope.deleteUser = function (id) {
      if (confirm("Etes vous sur ?")) $http.delete("http://poo-ihm-2015-rest.herokuapp.com/api/Users/" + id);
    };



    /****************** Actions sur les Projets ******************/

    $scope.updateProject = function (id, title, description, year) {
      var project = {};
      project.title = title;
      project.description = description;
      project.year = year;
      $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Project/" + id, project);
    };

    /**
     * Crée un projet
     *
     * @param newTitle Le nouveau titre
     * @param newDescription La nouvelle description
     * @param newYear L'année du projet
     */
    $scope.createProject = function (newTitle, newDescription, newYear) {
      var project = {};
      project.title = newTitle;
      project.description = newDescription;
      project.year = newYear;
      $http.post("http://poo-ihm-2015-rest.herokuapp.com/api/Projects", project);
    };

    /**
     * Supprime un projet
     *
     * @param id L'id du projet à supprimer
     */
    $scope.deleteProject = function(id) {
      if (confirm("Etes vous sur de vouloir supprimer ce projet ?"))
        $http.delete("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/" + id);
    };


    /********************* Méthodes pour ajouter une personne à un projet ainsi que son rôle ************/

    $scope.getIdOfUser = function(user,projectId) {
      $scope.idOfUser = user.id;
      $scope.getUserInfo($scope.idOfUser,projectId)
    };

    $scope.getUserInfo = function(userId,projectId) {
      $http.get("http://poo-ihm-2015-rest.herokuapp.com/api/Users/" + userId)
        .success(function (data) {
          $scope.userInfo = data.data;
          var user = {};
          user.name = $scope.userInfo.name;
          user.surname = $scope.userInfo.surname;
          user.email = $scope.userInfo.email;
          user.website = $scope.userInfo.website;
          $scope.addUserToProject(user,userId,projectId);
        });
    };

    $scope.addUserToProject = function(user,userId,projectId) {
      $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+projectId+"/Users/"+userId, user);
    };

    $scope.addRole = function (id, projectId, role) {
      var roleTemp = {};
      roleTemp.name = role;
      roleTemp.UserId = id;
      roleTemp.ProjectId = projectId;
      $http.post("http://poo-ihm-2015-rest.herokuapp.com/api/Roles/", roleTemp);
    };



    /****************** Méthodes pour voir les utilisateurs et leur rôles pour chaque projet ******************/

    /**
     * Récupère tout les rôles des personnes pour un projet donné
     * ainsi que l'UserId associé à ces rôles.
     *
     * @param id Id du projet en question
     */
    $scope.getUserAndRole = function (id) {
      $http.get("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/" + id + "/Roles")
        .success(function (data) {
          $scope.array = data.data;
          $scope.sortUserAndRole($scope.array);
        })
    };

    /**
     * Méthode de tri qui permet d'obtenir dans userArrayId les id
     * de chaque user et dans roleArray le rôle de ces user.
     *
     * @param tab Tableau de données obtenu avec getUserAndRole()
     */
    $scope.sortUserAndRole = function (tab) {
      $scope.userArrayId = [];
      $scope.roleArray = [];
      for (var i = 0; i < tab.length; i++) {
        $scope.userArrayId[i] = tab[i].UserId;
        $scope.roleArray[i] = tab[i].name;
      }
      $scope.getUserById($scope.userArrayId);
    };

    /** Variable globale utilisée dans getUserById() afin de pouvoir utiliser http.get dans la boucle for **/
    var j = 0;

    /**
     * Permet de parcourir le tableau passé en paramètre et de
     * récupérer les informations des user en fonction de leur
     * UserId
     *
     * @param tab Tableau des UserId
     */
    $scope.getUserById = function (tab) {
      for (var i = 0; i < tab.length; i++) {
        $http.get("http://poo-ihm-2015-rest.herokuapp.com/api/Users/" + tab[i])
          .success(function (data) {
            $scope.showUserAndRoleOfProject(data.data.name, $scope.roleArray[j]);
          })
      }
    };

    /**
     * Ecrit dans le modal le nom de la personne suivi de
     * son rôle dans le projet
     *
     * @param name Le nom de la personne
     * @param role Le rôle de la personne
     */
    $scope.showUserAndRoleOfProject = function (name, role) {
      document.getElementById("userOfProject").innerHTML += "<li>" + name + ' | role : ' + role + ' ' + "</li>";
      j++;
    };



    /****************** Méthodes utiles ******************/

    $scope.clearModal = function () {
      document.getElementById("userOfProject").innerHTML = "";
    };

    $scope.goToUser = function (id) {
      $location.path('/moreInfo/'+id);
    };

    $scope.goToAddUserWithRole = function(id) {
      $location.path('/userAndRole/'+id);
    };

    $scope.updateVariableId = function(id) {
      $scope.projectId = id;
    };

  });

