'use strict';

angular.module('pi4jfrontend')
    .controller('UserCtrl', function ($scope, $q, $routeParams, $location, localStorageService, Users, NetworkDevices) {

        $scope.save = function (user) {
            Users.save(user, function (response) {
                $location.path("/users");
            });
        }

        $scope.deleteUser = function (user) {
            Users.delete(user, function (response) {
                $location.path('/users');
                var index = $scope.users.indexOf(user);
                $scope.users.splice(index, 1);
            });
        };


        $scope.getUserById = function (username) {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].username == username) {
                    return $scope.users[i];
                }
            }
        }

        $scope.calcBooleanUserState = function (user) {
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
        };

        $scope.userListPullRefresh = function () {
            Users.query({}, function (response) {
                    $scope.$broadcast('scroll.refreshComplete');
                }
            )
        };

        $scope.queryUsers = function(){
            $scope.users = Users.query();
        }

        $scope.receiveOwnIP = function(){
            NetworkDevices.getOwnIp({}, function(response){
                $scope.deviceIp = response.ip;
            });
        }

        $scope.queryLocalNetworkNodes = function(){
            $scope.localNetworkNodes = NetworkDevices.getAll();
        }

        $scope.init = function () {

            if ($routeParams.username) {
                $scope.editUser = Users.get({username: $routeParams.username})
            }
            else{
                $scope.username = localStorage.getItem("username");
                $q.all([$scope.queryUsers(), $scope.receiveOwnIP(), $scope.queryLocalNetworkNodes()
                    ]).then(function (response) {
                        $scope.removeUserNodeFromLocalNetworkNodesReturned();
                    });
            }
        };


        //trigger at the end
        $scope.init();
    }
);
