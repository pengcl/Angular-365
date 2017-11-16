"use strict";

appServices.factory('SmsSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.getActiveCode = function (phoneNumber) {
        var d = $q.defer();
        $http.get('http://app.yfq.cn:3099/api/getActiveCodeS/' + phoneNumber).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.checkMobileCode = function (phoneNumber, code) {
        var d = $q.defer();
        $http.jsonp('http://m.yfq.cn/wap/customer/checkMobileCodeSync.html?receiverMoblie=' + phoneNumber + '&mobileCode=' + code + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.remindSMS = function (memberId, productId) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/activity/bespokeMessage.ht?memberId=' + memberId + '&productId=' + productId).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);