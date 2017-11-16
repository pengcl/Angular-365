appServices.factory("PaySvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.pay = function (orderId, payType) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/pay/payment/orderPay.ht?orderId=' + orderId + '&payType=' + payType + '&isOrder=pay&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.flowPay = function (mobile, productId, productFlowPriceId, carrier, activityTag, channelCode, successUrl, couponNo, referrerId, category) {
        var d = $q.defer();
        //alert(cfApi.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&callback=JSON_CALLBACK');
        $http.jsonp(apiConfig.apiHost + '/order/submitFlowOrder.ht?mobile=' + mobile + '&productId=' + productId + '&productFlowPriceId=' + productFlowPriceId + '&carrier=' + carrier + '&activityTag=' + activityTag + '&channelCode=' + channelCode + '&successUrl=' + successUrl + '&couponNo=' + couponNo + '&referrerId=' + referrerId + '&category=' + category + '&platform=365flow&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);