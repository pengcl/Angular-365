"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('orderList', { //关于我们
            url: "/member/orderList/:orderStatus",
            templateUrl: "views/member/order/orderList/orderList.html",
            controller: "orderListController"
        });
}]).controller('orderListController', ['$scope', '$stateParams', 'UserSvc', 'OrderSvc', function ($scope, $stateParams, UserSvc, OrderSvc) {
    $scope.orderStatus = $stateParams.orderStatus;

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;

        OrderSvc.getOrderList($scope.userInfo.mobile, $scope.orderStatus).then(function success(data) {
            $scope.orderList = (angular.fromJson(data)).sort(function (a, b) {
                return Date.parse(b.createTime) - Date.parse(a.createTime);
            });

        });
    });
}]);