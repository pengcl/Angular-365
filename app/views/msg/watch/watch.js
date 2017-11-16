"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('watch', { //app首页
            url: "/watch",
            templateUrl: "views/msg/watch/watch.html",
            controller: "watchController"
        });
}]).controller('watchController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {


}]);