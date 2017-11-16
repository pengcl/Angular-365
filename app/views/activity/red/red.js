"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('red', { //关于我们
            url: "/activity/red",
            templateUrl: "views/activity/red/red.html",
            controller: "redController"
        });
}]).controller('redController', ['$scope', function ($scope) {
}]);