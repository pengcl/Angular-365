"use strict";

appServices.factory('UserSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.getUserInfoByOpenid = function (openid) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/findOpenId.ht?openId=' + openid + '&platform=365flow').success(function (data) {
            if(data){
                return d.resolve(angular.fromJson(data));
            }else {
                return d.resolve("");
            }
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getUserInfoByMobile = function (mobile) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/findOpenId.ht?mobile=' + mobile + '&platform=365flow').success(function (data) {
            if(data){
                return d.resolve(angular.fromJson(data));
            }else {
                return d.resolve("");
            }
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getUserStatus = function (memberId) {//获取用户信息 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/flowMemberCenter.ht?memberId=' + memberId).success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getUserFlowLogList = function (memberId) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/myGiveFlowLogList.ht?memberId=' + memberId).success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);