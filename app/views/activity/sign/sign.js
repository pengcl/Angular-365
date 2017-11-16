"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('sign', { //关于我们
            url: "/activity/sign",
            templateUrl: "views/activity/sign/sign.html",
            controller: "signController"
        });
}]).controller('signController', ['$scope', '$http', 'UserSvc', 'ShareSvc', function ($scope, $http, UserSvc, ShareSvc) {

    ShareSvc.wxShare({
        title: '每周来签到，5元拿到手',
        desc: '手机购物券，购机抵扣5元，最多可叠加抵扣100元',
        link: 'http://app.ljker.com/activity/sign',
        imgUrl: 'http://app.ljker.com/views/activity/sign/shareImg.jpg'
    });

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;

        $http.get(apiConfig.apiHost + "/member/getSignInfo.ht?custId=" + $scope.userInfo.memberId).success(function (data, status, headers, config) {//获取抽中物品记录
            $scope.signInfo = angular.fromJson(data)[0];
            console.log($scope.signInfo);

        }).error(function (error) {
            console.log(error);
        });
    });

    $scope.sign = function () {
        $http.get(apiConfig.apiHost + "/member/sign.ht?custId=" + $scope.userInfo.memberId).success(function (data, status, headers, config) {//获取抽中物品记录
            var result = angular.fromJson(data);

            if (result.code == 0) {
                $scope.signInfo.signDaysCount = $scope.signInfo.signDaysCount + 1;
            }
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: result.msg,
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });

        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.getPrize = function (item, target) {
        $http.get(apiConfig.apiHost + "/member/getSignPrize.ht?givelogId=" + item.givelogid).success(function (data, status, headers, config) {//获取抽中物品记录
            var result = angular.fromJson(data)[0];
            if (result.code == 0) {
                $scope.signInfo[target].isReceive = 1;
            }
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: result.msg,
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });
            //$scope.dialog.open(true, "系统提示", $scope.prize.msg, [{show: true, txt: '我知道了', eventId: 'hello'}]);

        }).error(function (error) {
            console.log(error);
        });
    }
}]);