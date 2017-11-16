"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('record', { //关于我们
            url: "/member/record",
            templateUrl: "views/member/record/record.html",
            controller: "recordController"
        });
}]).controller('recordController', ['$scope', 'UserSvc', 'OrderSvc', function ($scope, UserSvc, OrderSvc) {
    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;

        OrderSvc.getOrderList($scope.userInfo.memberId, '', 'recharge').then(function success(data) {
            $scope.orderList = (angular.fromJson(data)).sort(function (a, b) {
                return Date.parse(b.createTime) - Date.parse(a.createTime);
            });

        });
    });
}]);