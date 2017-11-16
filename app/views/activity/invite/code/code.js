"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('inviteCode', { //关于我们
            url: "/activity/invite/code",
            templateUrl: "views/activity/invite/code/code.html",
            controller: "inviteCodeController"
        });
}]).controller('inviteCodeController', ['$scope', 'UserSvc', 'ShareSvc', function ($scope, UserSvc, ShareSvc) {

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        console.log(data);
    });

    $scope.shareMaskShow = false;
    ShareSvc.wxShare({
        title: '邀请好友关注',
        desc: '领免费流量，更有机会抽大奖哦！',
        link: 'http://app.ljker.com/activity/invite/code',
        imgUrl: 'http://app.ljker.com/views/activity/invite/shareImg.jpg',
        shareSuccess: function () {
            $scope.$apply($scope.shareMaskShow = false);
        },
        shareCancel: function () {
            $scope.$apply($scope.shareMaskShow = false);
        }
    });
}]);