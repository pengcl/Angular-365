"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('home', { //关于我们
            url: "/member/home",
            templateUrl: "views/member/home/home.html",
            controller: "homeController"
        });
}]).controller('homeController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        UserSvc.getUserStatus($scope.userInfo.memberId).then(function success(data) {
            $scope.userStatus = angular.fromJson(data);
            console.log($scope.userStatus);
        });
    });
}]);