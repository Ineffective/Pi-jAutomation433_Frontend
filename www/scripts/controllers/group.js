'use strict';

angular.module('pi4jfrontend')
    .controller('GroupCtrl', function ($scope, $location, $route, $routeParams, Groups, Users, Switches, localStorageService) {

        $scope.newGroup = {
            plugs: {},
            users: {}
        }

        $scope.submitGroup = function (group) {
            Groups.save(group, function (response) {
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
            $scope.groups = Groups.query({}, function(response){
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.getGroupById = function(id){
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].id == id) {
                    return $scope.groups[i];
                }
            }
        }

        $scope.deleteGroup = function(group){
            group.$delete()
                .then(function(response){
                    $location.path('/groups');   //if successful, return to previous page
                });
        }


        $scope.init = function () {
            if ($routeParams.id || $location.path() == '/groups/add') {
                $scope.users = Users.query();
                $scope.plugs = Switches.query();
                if($routeParams.id){
                    $scope.editGroup = Groups.get({id: $routeParams.id});
                }
            }else{
                $scope.groups = Groups.query();
            }

        }
        //trigger at the end
        $scope.init();
    }
);
