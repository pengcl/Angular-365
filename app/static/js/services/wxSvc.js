"use strict";

appServices.factory('WxSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.getWxParameter = function () {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/product/getWxParameter.ht?shareUrl=" + encodeURI(window.location.href.split("#")[0])).success(function (data, status, headers, config) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);