"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('cookies', {
            url: "/cookies",
            templateUrl: "views/member/settings/cookies/cookies.html",
            controller: "cookiesController"
        });
}]).controller('cookiesController', ['$scope', '$cookieStore', 'UserSvc', function ($scope, $cookieStore, UserSvc, openid) {

    console.log($cookieStore.get('openid'));

    $scope.removeCookies = function () {
        clearCookie();

        $scope.cookiesRemoved = false;
        $scope.dialog.open({
            show: true,
            title: "系统提示",
            body: 'Cookies清除成功，请重新登录！',
            buttons: [{show: true, txt: '我知道了', eventId: 'removeCookies'}]
        });

        $scope.$on('appDialog', function (e, eventId) {
            if (eventId === 'removeCookies') {
                //location.reload();
                $scope.cookiesRemoved = true;
            }
        })
    }
}]);