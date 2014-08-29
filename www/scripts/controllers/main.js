'use strict';

angular.module('pi4jfrontend')
    .controller('MainCtrl', function ($scope, backendService, localStorageService) {


        $scope.init = function () {
            backendService.getAllUsers(function(result){
                $scope.users = result;
            })
        }

        //trigger at the end
        $scope.init();
    });
