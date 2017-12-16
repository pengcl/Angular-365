"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('inviteCode', { //关于我们
            url: "/activity/invite/code",
            templateUrl: "views/activity/invite/code/code.html",
            controller: "inviteCodeController"
        });
}]).controller('inviteCodeController', ['$scope', 'UserSvc', 'ShareSvc', '$location', function ($scope, UserSvc, ShareSvc, $location) {

    console.log($scope.openid);
    UserSvc.getUserInfoByOpenid($location.search().recommender).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        console.log($scope.userInfo);
    });

    $scope.shareMaskShow = false;
    ShareSvc.wxShare({
        title: '邀请好友关注',
        desc: '领免费流量，更有机会抽大奖哦！',
        link: 'http://app.danius.cn/activity/invite/code',
        imgUrl: 'http://app.danius.cn/views/activity/invite/shareImg.jpg',
        shareSuccess: function () {
            $scope.$apply($scope.shareMaskShow = false);
        },
        shareCancel: function () {
            $scope.$apply($scope.shareMaskShow = false);
        }
    });
}]);