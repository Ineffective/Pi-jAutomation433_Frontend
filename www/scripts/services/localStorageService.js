'use strict';

/**
 * A module that manages different lists of items in our local storage. we can use these lists e.g. for users, groups, plugs ..... But any item in the list must have an attribute "id"
 */
angular.module('pi4jfrontend')
    .factory('localStorageService', function () {

        /*initiating*/

        var data = {};


        data.plugs = JSON.parse(localStorage.getItem("plugs"));
        if (data.plugs == null) {
            data.plugs = [];
        }


        data.users = JSON.parse(localStorage.getItem("users"));
        if (data.users == null) {
            data.users = [];
        }

        data.groups = JSON.parse(localStorage.getItem("groups"));
        if (data.groups == null) {
            data.groups = [];
        }


        var moo = "fasf";
        var doo = function () {
            return moo;
        };
        var loo = function () {
            return groups;
        };

        /*generic version*/
        var setList = function (listKey, listData) {
            //set a common ground (empty array object)
            if (data[listKey]) {
                data[listKey].splice(0, data[listKey].length)
            } else {
                data[listKey] = [];
            }

            //start filling list
            var list = data[listKey];

            for (var i = 0; i < listData.length; i++) {
                list.push(listData[i]);
            }

            //and push to localStorage
            updateLocalStorageItem(listKey, list);

        }

        var removeItemFromList = function (listKey, item) {
            var index = getItemIndexInArrayByItemId(item, data[listKey]);
            if (index >= 0) {
                data[listKey].splice(index, 1);
                updateLocalStorageItem("listKey", data[listKey]);
            }
        }

        var updateItemInList = function (listKey, item) {
            var index = getItemIndexInArrayByItemId(item, data[listKey]);
            if (index >= 0) {
                data[listKey][index] = item;
            } else {
                data[listKey].push(item);
            }
        }

        var getList = function (listKey) {
            return data[listKey];
        }


        /* utility functions */

        var getItemIndexInArrayByItemId = function (item, array) {
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == item.id) {
                        return i;
                    }
                }
            }
            return -1;
        }


        var updateLocalStorageItem = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }


// Public API here
        return {
            setList: setList,
            removeItemFromList: removeItemFromList,
            updateItemInList: updateItemInList,
            getList: getList,
            doo: doo
        }

    })
;
