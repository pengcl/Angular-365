appServices.factory("ProductSvc", ['$http', '$q', function ($http, $q) {
    var service = {};
    service.getFlows = function (mobile) {//获取订单统计 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=1&platform=wap').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getFees = function (mobile) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/findProductFlows.ht?mobile=' + mobile + '&type=2&platform=wap').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);