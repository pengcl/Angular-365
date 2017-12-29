"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('seckill', { //关于我们
            url: "/activity/seckill",
            templateUrl: "views/activity/seckill/seckill.html",
            controller: "seckillController"
        });
}]).controller('seckillController', ['$scope', '$http', '$interval', 'UserSvc', 'ShareSvc', 'ActiveCodeSvc', 'SmsSvc', function ($scope, $http, $interval, UserSvc, ShareSvc, ActiveCodeSvc, SmsSvc) {

    window.location.href = "https://h5.youzan.com/v2/goods/2ohtldcg3iyg6";

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
    });

    $scope.smsOverlay = false;

    /*$http.get(apiConfig.apiHost + "/activity/getTurntableProduct.ht").success(function (data, status, headers, config) {
        $scope.roulettes = angular.fromJson(data);

        var getItem = function () {
            return "恭喜" + getRandomReceiverPhone() + "用户，获得了" + getRandomProduct($scope.roulettes);
        };

        $scope.luckyPeoples = getItem();
        $scope.luckyTime = getRanDomTime();
        $interval(function () {
            $scope.luckyPeoples = getItem();
            $scope.luckyTime = getRanDomTime();
        }, 2000);
    }).error(function (error) {
        console.log(error);
    });*/

    ShareSvc.wxShare({
        title: '周三秒杀，超值优惠！',
        desc: '秒杀活动的产品为限量供应，先到先得！',
        link: 'http://app.danius.cn/activity/seckill',
        imgUrl: 'http://app.danius.cn/views/activity/seckill/shareImg.jpg'
    });

    $http.get(apiConfig.apiHost + '/activity/getQgProduct.ht?openId=' + $scope.openid).success(function (data) {

        $scope.seckills = angular.fromJson(data)[0];

        var getItem = function () {
            return "恭喜" + getRandomReceiverPhone() + "用户，获得了" + $scope.seckills.recent.activity_name;
        };

        $scope.luckyPeoples = getItem();
        $scope.luckyTime = getRanDomTime();
        $interval(function () {
            $scope.luckyPeoples = getItem();
            $scope.luckyTime = getRanDomTime();
        }, 2000);
    }).error(function (error) {
        console.log(error);
    });

    $scope.buy = function () {
        $http.get(apiConfig.apiHost + '/activity/doPanicBuying.ht?openId=' + $scope.openid + "&productId=" + $scope.seckills.recent.id + "&successUrl=" + encodeURI(window.location.href)).success(function (data) {
            var data = angular.fromJson(data)[0];
            if (data.code == 200) {
                window.location.href = data.payUrl;
            } else if (data.code == 201) {
                if (data.state == 0) {
                    window.location.href = data.payUrl;
                } else {
                    $scope.payState = data.state;
                    $scope.dialog.open({
                        show: true,
                        title: "系统提示",
                        body: '您已经购买过该商品！',
                        buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                    });
                }
            } else {
                $scope.dialog.open({
                    show: true,
                    title: "系统提示",
                    body: data.msg,
                    buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                });
            }

        });
    };

    //登录
    $scope.activeText = "获取验证码";
    $scope.activeClass = true;

    //输入验证码

    var second = 59, timePromise = undefined;
    $scope.getActiveCode = function (e, mobile) {
        if ($(e.currentTarget).hasClass("disabled")) {
            return false;
        }
        //$scope.loadingToast.open(true);
        ActiveCodeSvc.getActiveCode(mobile).then(function success(data) {
            $scope.activeClass = false;
            //$scope.loadingToast.open(false);
            timePromise = $interval(function () {
                if (second <= 0) {
                    $interval.cancel(timePromise);
                    timePromise = undefined;

                    second = 59;
                    $scope.activeText = "重发验证码";
                    $scope.activeClass = true;
                } else {
                    $scope.activeText = second + "秒后可重发";
                    $scope.activeClass = false;
                    second--;

                }
            }, 1000, 100);
        });
    };

    $scope.remainSms = function (mobile, code, productId) {
        ActiveCodeSvc.checkMobileCode(mobile, code).then(function success(data) {
            if (data) {
                SmsSvc.remindSMS($scope.userInfo.memberId, productId).then(function success(data) {
                    $scope.smsOverlay = false;
                    data = angular.fromJson(data)[0];
                    if (data.result === '200') {
                        $scope.dialog.open({
                            show: true,
                            title: "系统提示",
                            body: '您已成功预约',
                            buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                        });
                    } else {
                        $scope.dialog.open({
                            show: true,
                            title: "系统提示",
                            body: data.msg,
                            buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                        });
                    }

                });
            } else {
                $scope.dialog.open({
                    show: true,
                    title: "系统提示",
                    body: '您的验证码不正确，请重新输入！',
                    buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                });
            }
        });
    }

}]);