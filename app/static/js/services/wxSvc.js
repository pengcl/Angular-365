"use strict";

appServices.factory('WxSvc', ['$rootScope', '$state', '$q', '$http', '$timeout', '$cookieStore', '$location', function ($rootScope, $state, $q, $http, $timeout, $cookieStore, $location) {
    var service = {};

    service.getWxParameter = function () {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + "/product/getWxParameter.ht?shareUrl=" + encodeURI(window.location.href.split("#")[0].replace(/&/gi, "AND"))).success(function (data, status, headers, config) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getOpenid = function (callBackUrl) {

        if ($location.path() === '/watch') {
            return false;
        }

        if ($location.search().openid) {
            $cookieStore.put('openid', $location.search().openid);
            return $location.search().openid;
        }

        if ($cookieStore.get('openid')) {
            return $cookieStore.get('openid');
        }

        $timeout(function () {
            window.location.href = "http://m.ljker.com/member/auth.ht?authType=" + $rootScope.state.name + "&platform=365flow&callBackUrl=" + encodeURI(callBackUrl);
        });
    };

    return service;
}]);