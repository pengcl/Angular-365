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
        title: '邀请好友关注',
        desc: '领免费流量，更有机会抽大奖哦！',
        link: 'http://app.ljker.com/activity/invite/code',
        imgUrl: 'http://app.ljker.com/views/activity/invite/shareImg.jpg',
        shareSuccess: function (data) {
            $scope.$apply($scope.shareMaskShow = false);
        },
        shareCancel: function () {
            $scope.$apply($scope.shareMaskShow = false);
        }
    });
}]);