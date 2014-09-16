'use strict';

var baseURL = "http://" + localStorage.getItem("backendIP") + ":8080/iot-spring-bpm/service"
var username = localStorage.getItem("username");



angular.module('pi4jfrontend')
    .factory('NetworkDevices', function ($resource) {
        return $resource(baseURL + '/networkdevices/:ownip', {ownip: '@ownip'}, {
            getOwnIp: {method: 'GET', isArray: false, params: {ownip: 'ownip'}},
            getAll: {method: 'GET', isArray: false}});
    })
    .factory('Switches', function($resource, localStorageService){
        return $resource(baseURL + '/switches/:id', null,{
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, header){
                    data = JSON.parse(data);
                    localStorageService.setList("plugs", data);
                    return data;
                }
            }
        });
    })

    .factory('Users', function($resource){
        return $resource(baseURL + '/users/:username', null);
    })

    .factory('Groups', function($resource){
        return $resource(baseURL + '/groups/:id', null);
    });
