'use strict';

angular.module('pi4jfrontend')
    .factory('backendService', function ($http, $resource, localStorageService) {

        //connection data for backend
        var ip = localStorage.getItem("backendIP");
        var username = localStorage.getItem("username");

        var port = "8080";
        var baseURI = "/iot-spring-bpm/service/";


        /* Local Network Services*/

        var getLocalNetworkNodes = function (callback) {
            var resource = $resource("http://" + ip + ":" + port + baseURI + "networkdevices")
            var result = resource.get()
            result.$promise.then(function (result) {
                callback(result);
            });
        }

        var getOwnIpAddress = function (callback) {
            $http.get("http://" + ip + ":" + port + baseURI + "networkdevices/ownip")
                .success(callback);
        }

        /* plug services */

        var getAllPlugs = function () {
            return $http.get("http://" + ip + ":" + port + baseURI + 'switches').success(function (result) {
                localStorageService.setList("plugs", result);
            })
        };


        var plugOff = function (plug) {
            var promise = $http(
                {
                    method: 'PUT',
                    url: "http://" + ip + ":" + port + baseURI + 'switches/deactivate/' + plug.id,
                    data: plug,
                    headers: {'Content-Type': 'application/json'}
                }
            )

            promise.then(function (response) {
                localStorageService.updateItemInList("plugs", response.data);
            })

            return promise;
        }

        var plugOn = function (plug) {
            var promise = $http(
                {
                    method: 'PUT',
                    url: "http://" + ip + ":" + port + baseURI + 'switches/activate/' + plug.id,
                    data: plug,
                    headers: {'Content-Type': 'application/json'}
                }
            )

            promise.then(function (response) {
                localStorageService.updateItemInList("plugs", response.data);
            })

            return promise;
        }


        var syncWithLocalStorage = function (promise) {
            //TODO sync with localStorage


        }

        var submitPlug = function (plug) {
            //TODO DEBUG
            //plug.deviceType = "ELRO";

            return $http({
                method: 'POST',
                url: "http://" + ip + ":" + port + baseURI + "switches",
                data: plug
            }).then(function (response) {
                    localStorageService.updateItemInList("plugs", response.data);
                    return response.data;
                }
            )
        };

        var deletePlug = function (plug) {
            return $http({
                method: 'DELETE',
                url: "http://" + ip + ":" + port + baseURI + "switches/" + plug.id
            }).then(function (response) {
                    if (response.status == 200) {
                        localStorageService.removeItemFromList("plugs", plug);
                    }
                }
            )
        }

        /* user services*/
        var getAllUsers = function (callback) {
            return $http.get("http://" + ip + ":" + port + baseURI + "users").success(function (data) {
                localStorageService.setList("users", data);
                callback(data);
            });
        }


        var submitUser = function (user, callback) {
            $http.post("http://" + ip + ":" + port + baseURI + "users", user).success(function (data) {
                localStorageService.updateItemInList("users", data);
                callback(data);
            });
        }

        var updateUser = function(user, callback){
            $http.put("http://" + ip + ":" + port + baseURI + "users", user).success(function (data) {
                localStorageService.updateItemInList("users", user);
                callback(data);
            });
        }

        var deleteUser = function (user, callback) {
            $http.delete("http://" + ip + ":" + port + baseURI + "users/" + user.id, {
                data: user
            }).success(function(data){
                    localStorageService.removeItemFromList("users", user);
                    callback(data);
                });
        }

        /* Group Services */

        var getGroups = function (callback) {
            return $http.get("http://" + ip + ":" + port + baseURI + "groups").success(function (data) {
                localStorageService.setList("groups", data);
                callback(data);
            });
        }

        var submitGroup = function (group, callback) {
            $http.post("http://" + ip + ":" + port + baseURI + "groups", group).success(function (data) {
                localStorageService.updateItemInList("groups", data);
                callback(data);
            });
        }

        var deleteGroup = function(group, callback){
            $http.delete("http://" + ip + ":" + port + baseURI + "groups/" + group.id).success(function (data) {
                localStorageService.removeItemFromList("groups", group);
                callback(data);
            });
        }


        /* getter and setter e.g. for local storage */

        var setIP = function (newIP) {
            ip = newIP;
            localStorage.setItem("backendIP", newIP);
        }

        var getIP = function () {
            return ip;
        }

        var setUsername = function (newUsername) {
            username = newUsername;
            localStorage.setItem("username", newUsername);
        }

        var getUsername = function () {
            return username;
        }

        // Public API here
        return {
            getAllPlugs: getAllPlugs,
            submitPlug: submitPlug,
            plugOff: plugOff,
            plugOn: plugOn,
            setIP: setIP,
            getIP: getIP,
            getUsername: getUsername,
            setUsername: setUsername,
            deletePlug: deletePlug,
            getLocalNetworkNodes: getLocalNetworkNodes,
            getOwnIpAddress: getOwnIpAddress,
            getAllUsers: getAllUsers,
            submitUser: submitUser,
            updateUser:updateUser,
            deleteUser: deleteUser,
            getGroups: getGroups,
            submitGroup: submitGroup,
            deleteGroup: deleteGroup
        };


    }
);
