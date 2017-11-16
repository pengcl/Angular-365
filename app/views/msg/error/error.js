"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('error', { //app首页
            url: "/error",
            templateUrl: "views/msg/error/error.html",
            controller: "errorController"
        });
}]).controller('errorController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {

    if ($location.search()) {
        $scope.errorData = $location.search();
    }
}]);