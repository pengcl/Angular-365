"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('couponList', { //关于我们
            url: "/member/couponList?isUsed&isOverdue",
            templateUrl: "views/member/coupon/couponList/couponList.html",
            controller: "couponListController"
        });
}]).controller('couponListController', ['$scope', '$stateParams', '$location', '$filter', 'UserSvc', 'CouponSvc', function ($scope, $stateParams, $location, $filter, UserSvc, CouponSvc) {
    $scope.isUsed = $stateParams.isUsed;
    $scope.isOverdue = $stateParams.isOverdue;

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        CouponSvc.getCouponList($scope.userInfo.memberId).then(function success(data) {
            $scope.couponList = $filter('filter')(data.couponList, {
                isUsed: $scope.isUsed,
                isOverdue: $scope.isOverdue
            });
        });
    });
}]);