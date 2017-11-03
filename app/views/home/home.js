"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('home', { //关于我们
            url: "/home",
            templateUrl: "views/home/home.html",
            controller: "homeController"
        });
}]).controller('homeController', ['$scope', function ($scope) {
}]);