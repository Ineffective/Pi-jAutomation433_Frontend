'use strict';

angular.module('pi4jfrontend')
    .controller('UserCtrl', function ($scope, $routeParams, $location, localStorageService, backendService) {


        $scope.username = "";

        /* TODO must be moved */
        $scope.setNewUsername = function (username) {
            backendService.setUsername(username);
        }

        $scope.submitUser = function (user) {
            backendService.submitUser(user, function (response) {
                $location.path("/users");
            });
        }

        $scope.updateUser = function(user){
            backendService.updateUser(user, function(response){
                $location.path("/users");
            })
        }

        $scope.deleteUser = function (user) {
            backendService.deleteUser(user, function (result) {
                if (result) {
                    var index = $scope.users.indexOf(user);
                    $scope.users.splice(index, 1);
                    $location.path('/users');
                }
            })
        }


        $scope.getUserById = function (username) {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].username == username) {
                    return $scope.users[i];
                }
            }
        }

        $scope.calcBooleanUserState = function (user) {
            /*var lastSeen = new Date(user.personalDevice.lastSeen);
             var justNow = new Date();
             justNow.setMinutes(justNow.getMinutes() - 2);

             return justNow.getTime() <= lastSeen.getTime();*/
            if (!$scope.userStates) {
                return false;
            }
            if ($scope.userStates[user.username] == "offline") {
                return false;
            }
            if ($scope.userStates[user.username] == "online") {
                return true;
            }
        }

        /**
         * removes all user nodes from available list so only devices that arent yet bound are displayed as bindable
         */
        $scope.removeUserNodeFromLocalNetworkNodesReturned = function () {
            var users = $scope.users;
            var nodes = $scope.localNetworkNodes;

            for (var i = 0; i < users.length; i++) {
                if (nodes[users[i].personalDevice.macAddress]) {
                    delete nodes[users[i].personalDevice.macAddress];
                }

            }
        }


        $scope.userListPullRefresh = function () {
            userRefresh();
        }

        var userRefresh = function () {
            //get users from local storage then get users from backend (backendService will update localStorage)
            $scope.users = localStorageService.getList("users");
            backendService.getAllUsers(function (data) {//not used since we use the object from localStorage
                hideRefresh();
            });

        }

        var hideRefresh = function(){
            $scope.$broadcast('scroll.refreshComplete');

        }


        $scope.init = function () {
            $scope.username = backendService.getUsername();

            backendService.getOwnIpAddress(function (result) {
                $scope.deviceIp = JSON.parse(result);
            });

            backendService.getLocalNetworkNodes(function (result) {
                $scope.localNetworkNodes = result;
                $scope.removeUserNodeFromLocalNetworkNodesReturned();
            });

            userRefresh();

            if ($routeParams.username) {
                $scope.editUser = angular.copy($scope.getUserById($routeParams.username));
            }
        }

//trigger at the end
        $scope.init();
    })
;
