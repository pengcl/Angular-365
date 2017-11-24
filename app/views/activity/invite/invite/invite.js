"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('invite', { //关于我们
            url: "/activity/invite/invite",
            templateUrl: "views/activity/invite/invite/invite.html",
            controller: "inviteController"
        });
}]).controller('inviteController', ['$scope', 'UserSvc', 'ShareSvc', function ($scope, UserSvc, ShareSvc) {
    $scope.shareMaskShow = false;

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        ShareSvc.getInvite($scope.userInfo.memberId).then(function success(data) {
            $scope.invite = data;
        });
    });

    ShareSvc.wxShare({
        title: '快来领免费流量！',
        desc: '还有各种抽奖和秒杀优惠，快来试试吧！',
        link: 'http://app.ljker.com/activity/invite/code?recommender=' + $scope.openid,
        imgUrl: 'http://app.ljker.com/views/activity/invite/shareImg.jpg',
        shareSuccess: function (data) {
            $scope.$apply($scope.shareMaskShow = false);
        },
        shareCancel: function () {
            $scope.$apply($scope.shareMaskShow = false);
        }
    });
}]);