'use strict';

angular.module('pi4jfrontend')
    .controller('MainCtrl', function ($scope, Users, localStorageService) {


        $scope.init = function () {
            $scope.users = Users.query();
        }

        //trigger at the end
        $scope.init();
    });
