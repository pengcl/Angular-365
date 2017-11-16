appServices.factory("OrderSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCounts = function (receiverMobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findOrderStatusCounts.ht?receiverMobile=' + receiverMobile).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrderList = function (memberId, orderStatus, activeTag) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/searchOrders.ht?memberId=' + memberId + '&orderStatus=' + orderStatus + '&activeTag=' + activeTag).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOrder = function (orderNo) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/order/getSalesOrder.ht?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.exchange = function (memberId, productId, productFlowPriceId) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/order/rechargeGiveFlow.ht?memberId=' + memberId + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&channelCode=?&category=').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getLogistics = function (orderNo) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findLogistics.ht?orderNo=' + orderNo).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);