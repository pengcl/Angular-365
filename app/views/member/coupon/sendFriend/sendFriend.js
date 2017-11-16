"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('sendFriend', { //关于我们
            url: "/member/sendFriend?couponNo",
            templateUrl: "views/member/coupon/sendFriend/sendFriend.html",
            controller: "sendFriendController"
        });
}]).controller('sendFriendController', ['$scope', '$stateParams', '$state', 'CouponSvc', function ($scope, $stateParams, $state, CouponSvc) {
    $scope.couponNo = $stateParams.couponNo;
    CouponSvc.getCouponDetail($scope.userInfo.memberId, $scope.couponNo).then(function success(data) {
        $scope.coupon = data;
    });

    $scope.send = function (checked, couponNos, fromMobile, toMobile) {
        if (checked) {
            CouponSvc.send(couponNos, fromMobile, toMobile).then(function success(data) {
                if (data[0].result) {
                    $scope.$root.dialog.open(true, '系统提示', '您的优惠券赠送成功', ['我知道了', '']);
                    //window.history.back();
                } else {
                    $scope.$root.dialog.open(true, '系统提示', data[0].msg, ['我知道了', '']);
                }
            });
        }
    };

    $scope.$on('appDialog', function (e, msg) {
        if (msg === '我知道了') {
            $state.go('couponList', {isUsed: 0, isOverdue: 0});
        }
    });
}]);