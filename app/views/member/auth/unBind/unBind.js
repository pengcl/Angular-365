"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('unBind', { //关于我们
            url: "/member/unBind",
            templateUrl: "views/member/auth/unBind/unBind.html",
            controller: "unBindController"
        });
}]).controller('unBindController', ['$scope', '$state', '$interval', '$cookieStore', '$location', 'AuthenticationSvc', 'UserSvc', 'ActiveCodeSvc', function ($scope, $state, $interval, $cookieStore, $location, AuthenticationSvc, UserSvc, ActiveCodeSvc) {
    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
        console.log(data);
    });

    $scope.activeText = "获取验证码";
    $scope.activeClass = true;

    //输入验证码

    var second = 59, timePromise = undefined;
    $scope.getActiveCode = function (e, mobile) {
        if ($(e.currentTarget).hasClass("disabled")) {
            return false;
        }
        //$scope.loadingToast.open(true);
        ActiveCodeSvc.getActiveCode($scope.userInfo.mobile).then(function success(data) {
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

    $scope.unbind = function (mobile, code) {
        ActiveCodeSvc.checkMobileCode(mobile, code).then(function success(data) {
            if (data) {
                AuthenticationSvc.unbinding($scope.openid, $scope.userInfo.memberId, '').then(function success(data) {
                    console.log(data);
                    if (data.result) {
                        $cookieStore.remove('userInfo');
                        $state.go('signIn');
                    } else {
                        $scope.dialog.open({
                            show: true,
                            title: "系统提示",
                            body: data.resultMsg,
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