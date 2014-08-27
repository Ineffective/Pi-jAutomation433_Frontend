'use strict';

angular.module('pi4jfrontend')
    .controller('EditCtrl', function ($scope, backendService, localStorageService) {
        $scope.init = function () {
            $scope.plugs = localStorageService.getList("plugs");
        }

        //trigger at the end
        $scope.init();
    });
