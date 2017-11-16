"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('flow', {
            url: "/member/flow",
            templateUrl: "views/member/flow/flow.html",
            controller: "flowController"
        });
}]).controller('flowController', ['$scope', 'UserSvc', function ($scope, UserSvc) {
    UserSvc.getUserStatus($scope.userInfo.memberId).then(function success(data) {
        $scope.userStatus = angular.fromJson(data);
    });
    UserSvc.getUserFlowLogList($scope.userInfo.memberId).then(function success(data) {//获取用户信息
        $scope.userFlowLogList = data;
    });
}]);