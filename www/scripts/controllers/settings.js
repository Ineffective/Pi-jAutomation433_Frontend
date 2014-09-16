'use strict';

angular.module('pi4jfrontend')
    .controller('SettingsCtrl', function ($scope, localStorageService) {

        $scope.ip = "";
        $scope.username = "";

        $scope.setNewIP = function (ip) {
            localStorage.setItem("backendIP", ip);
        }

        $scope.setNewUsername = function (username) {
            localStorage.setItem("username", username);
        }

        $scope.clearLocalStorageData = function(){
            localStorage.clear();
        }



        $scope.init = function () {
            $scope.ip = localStorage.getItem("backendIP");
            $scope.username = localStorage.getItem("username");

            //get users from local storage then get users from backend (backendService will update localStorage
            $scope.users = localStorageService.getList("users");

        }

        //trigger at the end
        $scope.init();
    });
