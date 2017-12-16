"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('followF', { //关于我们
            url: "/activity/followF",
            templateUrl: "views/activity/follow/followF.html",
            controller: "followFController"
        });
}]).controller('followFController', ['$scope', '$state', '$http', '$cookieStore', '$timeout', '$interval', 'ActiveCodeSvc', 'AuthenticationSvc', 'ShareSvc', 'UserSvc', function ($scope, $state, $http, $cookieStore, $timeout, $interval, ActiveCodeSvc, AuthenticationSvc, ShareSvc, UserSvc) {

    $scope.turntableNum = 1;
    $scope.award = {
        overlay: false
    };

    if ($cookieStore.get('turntableNum') == 0) {
        $scope.turntableNum = $cookieStore.get('turntableNum');
        $scope.award = {
            overlay: true
        };
    }

    var count = 0;
    var index = 0;
    var prizeNum = 4;

    ShareSvc.wxShare({
        title: '关注有礼，流量送不停！',
        desc: '关注有礼，流量送不停，邀请好友一起来摇奖吧！',
        link: 'http://app.danius.cn/activity/follow',
        imgUrl: 'http://app.danius.cn/views/activity/follow/shareImg.jpg'
    });

    var getItem = function () {
        return "恭喜" + getRandomProduct([{productname:"广州"},{productname:"北京"},{productname:"上海"},{productname:"重庆"},{productname:"南京"},{productname:"深圳"}]) + "网友，获得了" + getRandomProduct([{productname:"30MB流量"},{productname:"1G流量"},{productname:"10MB流量"},{productname:"100MB流量"},{productname:"20MB流量"},{productname:"5MB流量"}]);
    };

    $scope.luckyPeoples = getItem();
    $interval(function () {
        $scope.luckyPeoples = getItem();
    }, 2000);

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
        if ($scope.turntableNum > 0) {
            rouletteStart();
            $scope.turntableNum = 0;
            $cookieStore.put('turntableNum', 0)
        } else {
            console.log('转盘次数已用完。成功邀请好友关注可获得转盘次数，快去邀请好友吧！');
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

}]);