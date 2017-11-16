"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('couponHome', { //关于我们
            url: "/member/couponHome",
            templateUrl: "views/member/coupon/couponHome/couponHome.html",
            controller: "couponHomeController"
        });
}]).controller('couponHomeController', ['$scope', 'UserSvc', 'CouponSvc', function ($scope, UserSvc, CouponSvc) {
    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        CouponSvc.getCouponList($scope.userInfo.memberId).then(function success(data) {
            $scope.couponList = data;
        });
    });
}]);