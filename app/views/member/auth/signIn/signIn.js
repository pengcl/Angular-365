"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('signIn', { //关于我们
            url: "/signIn",
            templateUrl: "views/member/auth/signIn/signIn.html",
            controller: "signInController"
        });
}]).controller('signInController', ['$scope', '$state', '$interval', '$cookieStore', '$location', 'AuthenticationSvc', 'UserSvc', 'ActiveCodeSvc', function ($scope, $state, $interval, $cookieStore, $location, AuthenticationSvc, UserSvc, ActiveCodeSvc) {

    if(!$scope.openid){
        window.location.reload();
    }

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;
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

    $scope.signIn = function (mobile, code) {
        ActiveCodeSvc.checkMobileCode(mobile, code).then(function success(data) {
            if (data) {
                AuthenticationSvc.binding($scope.openid, mobile).then(function success(data) {
                    if (data.resultCode === 1) {
                        $scope.userInfo = data;
                        /*$scope.userInfo.isLogin = true;*/
                        $cookieStore.put('userInfo', $scope.userInfo);

                        if ($location.search().path) {
                            $location.path($location.search().path);
                        } else {
                            if ($scope.previousState.name) {
                                $state.go($scope.previousState.name);
                            } else {
                                $location.path('home');
                            }
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