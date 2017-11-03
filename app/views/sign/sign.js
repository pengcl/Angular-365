"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('sign', { //关于我们
            url: "/sign",
            templateUrl: "views/sign/sign.html",
            controller: "signController"
        });
}]).controller('signController', ['$scope', '$timeout', function ($scope, $timeout) {

}]);