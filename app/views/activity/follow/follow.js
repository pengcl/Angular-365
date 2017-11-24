"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('follow', { //关于我们
            url: "/activity/follow",
            templateUrl: "views/activity/follow/follow.html",
            controller: "followController"
        });
}]).controller('followController', ['$scope', '$state', '$http', '$timeout', '$interval', 'ActiveCodeSvc', 'AuthenticationSvc', 'ShareSvc', 'UserSvc', function ($scope, $state, $http, $timeout, $interval, ActiveCodeSvc, AuthenticationSvc, ShareSvc, UserSvc) {

    var count = 0;
    var index = 0;
    var prizeNum = 3;

    $http.get(apiConfig.apiHost + "/activity/getTurntableProduct.ht").success(function (data, status, headers, config) {
        $scope.roulettes = angular.fromJson(data);

        var getItem = function () {
            return "恭喜" + getRandomReceiverPhone() + "用户，获得了" + getRandomProduct($scope.roulettes);
        };

        $scope.luckyPeoples = getItem();
        $interval(function () {
            $scope.luckyPeoples = getItem();
        }, 2000);
    }).error(function (error) {
        console.log(error);
    });

    ShareSvc.wxShare({
        title: '关注有礼，流量送不停！',
        desc: '关注有礼，流量送不停，邀请好友一起来摇奖吧！',
        link: 'http://app.ljker.com/activity/follow',
        imgUrl: 'http://app.ljker.com/views/activity/follow/shareImg.jpg'
    });

    $scope.award = {
        overlay: false
    };

    function rouletteAni(index) {
        $(".roulette-item-box").removeClass("curr");
        $("#roulette-" + index).addClass("curr");
    }

    function rouletteEnd() {
        if (index <= prizeNum) {
            rouletteAni(index);
            index = index + 1;
        } else {
            $timeout(function () {
                $scope.award.overlay = true;
            }, 500);
            count = 0;
            return false;
        }
        $timeout(function () {
            rouletteEnd();
        }, 200);
    }

    function rouletteStart() {
        if (index <= 7) {
            rouletteAni(index);
            index = index + 1;
        } else if (index == 8 && count < 5) {
            index = 0;
            rouletteAni(index);
            count = count + 1;
        } else {
            index = 0;
            rouletteEnd();
            return false;
        }
        $timeout(function () {
            rouletteStart();
        }, 60);
    }

    $scope.start = function () {//开始抽奖
        if ($scope.userInfo.turntableNum > 0) {
            $scope.toast.show = true;
            $http.get(apiConfig.apiHost + "/activity/lottery.ht?customerId=" + $scope.userInfo.memberId).success(function (data, status, headers, config) {//获取抽中物品记录
                $scope.toast.show = false;
                $scope.lottery = angular.fromJson(data)[0];
                if ($scope.lottery.code === "1") {
                    $scope.dialog.open({
                        show: true,
                        title: "系统提示",
                        body: $scope.lottery.msg,
                        buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                    });
                } else {
                    $scope.userInfo.turntableNum = $scope.userInfo.turntableNum - 1;
                    prizeNum = $scope.lottery.result.id - 1;
                    $scope.prize = $scope.roulettes[prizeNum];
                    rouletteStart();
                }

            }).error(function (error) {
                console.log(error);
            });
        } else {
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: '转盘次数已用完。成功邀请好友关注可获得转盘次数，快去邀请好友吧！',
                buttons: [{show: true, txt: '邀请好友', eventId: 'invite'}, {show: true, txt: '返回', eventId: 'cancel'}]
            });
        }
    };

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;

    });

    $scope.getPrize = function (url) {
        if (url) {
            window.location.href = url;
        }
    };

    $scope.cancel = function () {
        $scope.award.overlay = false;
    };
    $scope.continue = function () {
        $scope.award.overlay = false;
        $scope.start();
    };
    $scope.success = function (url) {
        $scope.award.overlay = false;
        $scope.getPrize(url);
    };

    $scope.$on('appDialog', function (event, eventId) {
        if (eventId == 'invite') {
            $state.go('invite');
        }
    });
}]);