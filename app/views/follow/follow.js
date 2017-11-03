"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('follow', { //关于我们
            url: "/follow",
            templateUrl: "views/follow/follow.html",
            controller: "followController"
        });
}]).controller('followController', ['$scope', '$timeout', 'ShareSvc', function ($scope, $timeout, ShareSvc) {

    var count = 0;
    var index = 0;
    var prizeNum = 3;

    ShareSvc.wxShare({
        title: '哈哈',
        desc: '哈哈哈',
        link: 'http://365.com/follow',
        imgUrl: 'http://365.com/views/follow/follow-bg.png'
    });

    $scope.award = {
        overlay: false,
        bind: false,
        award: false
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
            $scope.award.overlay = true;
            $scope.award.bind = true;
            $scope.award.award = false;
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

    $scope.start = function () {
        rouletteStart();
    };

    $scope.bind = function (mobile) {
        $scope.award.overlay = true;
        $scope.award.bind = false;
        $scope.award.award = true;
    };
    $scope.success = function () {
        $scope.award.overlay = false;
        $scope.award.bind = false;
        $scope.award.award = false;
    };
}]);