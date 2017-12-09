"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('orderDetail', { //支付成功页
            url: "/member/orderDetail?orderNo",
            templateUrl: "views/member/order/orderDetail/orderDetail.html",
            controller: "orderDetailController"
        });
}]).controller('orderDetailController', ['$scope', '$stateParams', 'UserSvc', 'OrderSvc', 'PaySvc', function ($scope, $stateParams, UserSvc, OrderSvc, PaySvc) {


    OrderSvc.getOrder($stateParams.orderNo).then(function success(data) {
        data = angular.fromJson(data);
        $scope.order = data[0].salesOrder;
        console.log($scope.order);
    });


    $scope.buyNow = function (orderId, payType) {
        //$scope.$root.loadingToast.open(true);
        PaySvc.pay(orderId, payType).then(function success(data) {
            if (data.result) {
                //$scope.$root.loadingToast.open(false);
                window.location.href = data.payUrl;
            } else {
                //$scope.$root.loadingToast.open(false);
                //$scope.$root.dialog.open(true, '系统提示', data, ['我知道了', '']);
            }
        });
    };
}]);