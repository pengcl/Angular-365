"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('exchange', { //关于我们
            url: "/member/exchange",
            templateUrl: "views/member/exchange/exchange.html",
            controller: "exchangeController"
        });
}]).controller('exchangeController', ['$scope', '$http', 'UserSvc', 'ProductSvc', 'OrderSvc', function ($scope, $http, UserSvc, ProductSvc, OrderSvc) {

    UserSvc.getUserInfoByOpenid($scope.openid).then(function success(data) {//获取用户信息
        $scope.userInfo = data;

        UserSvc.getUserStatus($scope.userInfo.memberId).then(function success(data) {
            $scope.userStatus = angular.fromJson(data);
        }).then(function success() {
            ProductSvc.getFlows($scope.userInfo.mobile).then(function success(data) {
                var products = [];
                $.each(data.data, function (i, k) {
                    var obj = {
                        productId: k.productId,
                        productFlowPriceId: k.regionProducts[0].productFlowPriceId,
                        productName: k.productName,
                        value: k.sortNo
                    };
                    if (k.sortNo <= 1000 && k.sortNo >= 30) {
                        products.push(obj);
                    }
                });

                $scope.inputPickerData = products.sort(function (a, b) {
                    return b.value > a.value;
                });

                var index = 0;
                for (var i = 0; i < $scope.inputPickerData.length; i++) {
                    if ($scope.inputPickerData[i].value > $scope.userStatus.giveFlowNum) {
                        index = i;
                    }
                }

                console.log(index, $scope.inputPickerData.length);

                if (index + 1 >= $scope.inputPickerData.length) {
                    $scope.product = products[index];
                } else {
                    $scope.product = products[index + 1];
                }
            });
        });
    });

    $scope.setPickerShow = function () {//设置是否显示picker控件
        $scope.isPickerShow = true;
    };

    $scope.exchange = function (product) {
        $scope.toast.show = true;
        OrderSvc.exchange($scope.userInfo.memberId, product.productId, product.productFlowPriceId).then(function success(data) {
            $scope.toast.show = false;
            if ($scope.userStatus.giveFlowNum - product.value >= 0) {
                $scope.userStatus.giveFlowNum = $scope.userStatus.giveFlowNum - product.value;
            }
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: data.msg,
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });
        });
    };

    $scope.$watch('outputPickerData', function (n, o, scope) {
        if (n !== undefined && n !== o) {
            $scope.product = n;
        }
    });
}]);