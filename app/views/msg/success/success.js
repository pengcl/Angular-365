"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('success', { //app首页
            url: "/success",
            templateUrl: "views/msg/success/success.html",
            controller: "successController"
        });
}]).controller('successController', ['$scope', '$rootScope', '$location', 'OrderSvc', function ($scope, $rootScope, $location, OrderSvc) {

    $scope.orderNo = $location.search().orderNo;

    $scope.mobile = $location.search().mobile;

    function getFlowCoupon(price, max) {
        if (price <= max) {
            return Math.floor(price);
        } else {
            return max;
        }
    }

    function getFeeCoupon(price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 50 == price) {
                return i * 5;
            }
            if (i * 50 > price) {
                return (i - 1) * 5;
            }
            if (i * 50 < price && i * 5 >= max) {
                return max;
            }
        }
    }

    $scope.rechargeDetails = "";

    OrderSvc.getOrder($scope.orderNo).then(function success(data) {
        $scope.order = angular.fromJson(data)[0];
        if ($scope.order.product.productname == '话费充值') {
            $scope.productType = "Fee";
            $scope.rechargeDetails = $scope.order.flowPrice.productName + "话费";
            $scope.getCoupon = getFeeCoupon($scope.order.salesOrder.amount, 30);
            writebdLog(appName + '_' + $rootScope.state.name, '_ycxzfcgfee');
        } else if ($scope.order.product.productname == '流量充值') {
            $scope.productType = "Flow";
            $scope.rechargeDetails = $scope.order.flowPrice.productName + $scope.order.flowPrice.region + "流量";
            $scope.getCoupon = getFlowCoupon($scope.order.salesOrder.paidamount, 30);
            writebdLog(appName + '_' + $rootScope.state.name, '_ycxzfcgflow');
        } else {
            $scope.productType = "Card";
            if ($location.search().platform && $location.search().platform == 'jrtt') {
                writebdLog(appName + '_' + $rootScope.state.name, '_' + $scope.productType + 'jrtt_Load');
            } else {
                writebdLog(appName + '_' + $rootScope.state.name, '_' + $scope.productType + '_Load');
            }
        }
    });

}]);