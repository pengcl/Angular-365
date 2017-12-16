"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('aWatch', { //关于我们
            url: "/activity/watch",
            templateUrl: "views/activity/watch/watch.html",
            controller: "aWatchController"
        });
}]).controller('aWatchController', ['$scope', function ($scope) {
    $scope.step = 0;
    $scope.open = function (step) {
        if(step <= 1){
            $scope.step = $scope.step + 1;
        }
    }
}]);