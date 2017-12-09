'use strict';

// Declare app level module which depends on views, and components

var app = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'appServices',
    'appFilters',
    'appTpl'
]);

var appServices = angular.module('appServices', []);
var appFilters = angular.module('appFilters', []);
var appName = "365_FLOW_A";

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/member/home');

}]).controller('appController', ['$scope', '$rootScope', '$location', '$cookieStore', 'UserAgentSvc', 'WxSvc', 'UserSvc', function ($scope, $rootScope, $location, $cookieStore, UserAgentSvc, WxSvc, UserSvc) {

    $scope.isWx = UserAgentSvc.isWx;
    $scope.activityTag = '365';

    $scope.gh = $location.search().gh;

    if ($scope.isWx) {

        $rootScope.openid = WxSvc.getOpenid(window.location.href);

        UserSvc.getUserInfoByOpenid($rootScope.openid).then(function success(data) {//获取用户信息
            $scope.userInfo = data;
        });
    }

}]).run(['$rootScope', '$state', '$stateParams', '$compile', '$location', '$timeout', 'UserAgentSvc', 'AuthenticationSvc', 'WxSvc', function ($rootScope, $state, $stateParams, $compile, $location, $timeout, UserAgentSvc, AuthenticationSvc, WxSvc) {

    $rootScope.params = $location.search();

    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {//初始化全局控件的状态

        var needLoginPages = ['member'];//需要登陆的页面

        var needLogin = function (needLoginPages) {//判断该页是否需要登录
            var flag = false;
            $.each(needLoginPages, function (i, k) {
                if ($location.path().indexOf(k) > 0) {
                    flag = true;
                }
            });
            return flag;
        };

        if (needLogin(needLoginPages)) {//判断是否需要登录
            AuthenticationSvc.isLogin(function (result) {
                if (result.success) {//已登录
                    $rootScope.userInfo = result.data;
                } else {//没登录
                    $location.path('/signIn');
                }
            });
        }
    });

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.location = window.location.href;

        if (UserAgentSvc.isWx) {

            $timeout(function () {
                WxSvc.getWxParameter().then(function success(data) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data[0].appId, // 必填，公众号的唯一标识
                        timestamp: data[0].timestamp, // 必填，生成签名的时间戳
                        nonceStr: data[0].nonceStr, // 必填，生成签名的随机串
                        signature: data[0].signature,// 必填，签名，见附录1
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                });
            }, 600);
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
        $rootScope.previousState = from; //from为前一个页面的路由信息：url,cache,views,name
        $rootScope.previousParams = fromParams; //fromParams为前一个页面的ID信息
        $rootScope.state = to; //to为当前页面的路由信息：url,cache,views,name，同样，toParams为当前页面的ID信息
        $rootScope.category = appName + '_' + $rootScope.state.name;

        writebdLog(appName + '_' + $rootScope.state.name, '_Load');

    });
}]);
