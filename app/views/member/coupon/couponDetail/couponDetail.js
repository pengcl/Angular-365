"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('couponDetail', { //关于我们
            url: "/member/couponDetail?couponNo",
            templateUrl: "views/member/coupon/couponDetail/couponDetail.html",
            controller: "couponDetailController"
        });
}]).controller('couponDetailController', ['$scope', '$stateParams', 'CouponSvc', 'UserSvc', function ($scope, $stateParams, CouponSvc, UserSvc) {
    $scope.couponNo = $stateParams.couponNo;

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        CouponSvc.getCouponDetail($scope.userInfo.memberId, $scope.couponNo).then(function success(data) {
            $scope.coupon = data;
        });
    });

    $scope.sendFriend = function (e, isUsed, isOverdue) {
        if (isUsed == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已使用，无法赠送');
            return false;
        }
        if (isOverdue == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已过期，无法赠送');
            return false;
        }
    };

    $scope.useCoupon = function (e, isUsed, isOverdue) {
        if (isUsed == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已使用，无法使用');
            return false;
        }
        if (isOverdue == 1) {
            e.preventDefault();//阻止跳转
            $scope.state.notification.open(true, '此优惠券已过期，无法使用');
            return false;
        }
    };
}]);