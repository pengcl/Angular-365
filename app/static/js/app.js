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

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('follow');

}]).controller('appController', ['$scope', 'WxSvc', 'UserAgentSvc', function ($scope, WxSvc, UserAgentSvc) {

    $scope.isWx = UserAgentSvc.isWx;

    if ($scope.isWx) {
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
    }
}]);
