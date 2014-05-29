'use strict';

angular.module('pi4jfrontend')
    .controller('GroupCtrl', function ($scope, $location,$routeParams, backendService, localStorageService) {

        $scope.newGroup = {
            plugs: {},
            users: {}
        }

        $scope.submitGroup = function (group) {
            backendService.submitGroup(group, function (response) {
                $location.path("/groups");
            });
        }

        $scope.userSelectChange = function (user) {
            //if user is already added to new Group, remove him
            if ($scope.newGroup.users[user.id]) delete $scope.newGroup.users[user.id];
            //if he is not yet added, add him
            else $scope.newGroup.users[user.id] = user.username;
        }

        $scope.plugSelectChange = function (plug) {

            //if plug is already added to new Group remove him
            if ($scope.newGroup.plugs[plug.id]) delete $scope.newGroup.plugs[plug.id];
            //if he is not yed added, add him
            else $scope.newGroup.plugs[plug.id] = plug.label;
        }

        $scope.objectHasProperty = function (object) {
            for (var prop in object) {
                return true;
            }
            return false;
        }

        $scope.groupListPullRefresh = function(){
            groupRefresh();
        }

        $scope.getGroupById = function(id){
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].id == id) {
                    return $scope.groups[i];
                }
            }
        }

        $scope.deleteGroup = function(group){
            backendService.deleteGroup(group, function(result){
                    $location.path('/groups');   //if successful, return to previous page
            })
        }

        var groupRefresh = function () {
            $scope.groups = localStorageService.getList("groups");
            backendService.getGroups(function (response) {
                hideRefresh();
            });

        }

        var hideRefresh = function(){
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.init = function () {
            $scope.users = localStorageService.getList("users");
            $scope.plugs = localStorageService.getList("plugs");
            groupRefresh();

            if ($routeParams.id) {
                $scope.editGroup = angular.copy($scope.getGroupById($routeParams.id));
            }
        }
        //trigger at the end
        $scope.init();
    }
);
