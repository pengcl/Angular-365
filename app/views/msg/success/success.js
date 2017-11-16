"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('success', { //app首页
            url: "/success",
            templateUrl: "views/msg/success/success.html",
            controller: "successController"
        });
}]).controller('successController', ['$scope', '$rootScope', '$location', '$stateParams', function ($scope, $rootScope, $location, $stateParams) {

    if ($location.search()) {
        $scope.successData = $location.search();
    }
}]);