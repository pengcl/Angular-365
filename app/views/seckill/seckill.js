"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('seckill', { //关于我们
            url: "/seckill",
            templateUrl: "views/seckill/seckill.html",
            controller: "seckillController"
        });
}]).controller('seckillController', ['$scope', function ($scope) {
}]);