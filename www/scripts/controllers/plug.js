'use strict';

angular.module('pi4jfrontend')
    .controller('PlugCtrl', function ($scope, $location,$routeParams, Switches, localStorageService) {



        $scope.init = function () {
            if($routeParams.id){
                $scope.editPlug = Switches.query({id: $routeParams.id});
            }
            else{
                $scope.plugs = Switches.query();
            }
        }

        $scope.getPlugById = function(id){
            for(var i = 0;i<$scope.plugs.length;i++){
                if($scope.plugs[i].id == id){
                    return $scope.plugs[i];
                }
            }
        }

        $scope.plugRefresh = function(){
            $scope.plugs = Switches.query({}, function(result){
                $scope.$broadcast('scroll.refreshComplete');
            });

        }

        $scope.submitPlug = function(plug){
            Switches.save(plug, function(response){
                $location.path("/plugs");
            });
        }

        $scope.deletePlug = function(plug){
            Switches.delete(plug, function(response){
                $location.path("/plugs");
            });
        }


        $scope.setPlugState = function(plug, state){
            var submitPlug = angular.copy(plug);
            submitPlug.lastKnownState = state;

            Switches.save(submitPlug, function(response){
                updateLocalPlugStateById(response.id, response.lastKnownState);
            });

        }

        var updateLocalPlugStateById = function(plugId, state){
            for(var i = 0; i<$scope.plugs.length;i++){
                if ($scope.plugs[i].id == plugId){
                    $scope.plugs[i].lastKnownState = state
                }
            }

        }


        //trigger at the end
        $scope.init();
    });
