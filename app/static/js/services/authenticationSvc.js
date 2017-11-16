appServices.factory("AuthenticationSvc", ['$http', '$q', '$cookieStore', 'UserAgentSvc', 'UserSvc', function ($http, $q, $cookieStore, UserAgentSvc, UserSvc) {
    var service = {};

    service.binding = function (openid, mobile) {//登录时绑定微信openId
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/initbinding.ht?openid=' + openid + '&receiverMobile=' + mobile + '&platform=365flow').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.unbinding = function (openid, customerId, mobile) {//登录时绑定微信openId
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/member/resetMobile.ht?openid=' + openid + '&customerId=' + customerId + '&mobile=' + mobile + '&platform=365flow').success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.isLogin = function (callback) {

        if (typeof callback === "function") {

            //判断userInfo的cookie是否存在
            if ($cookieStore.get('userInfo')) {//userInfo的cookie已经存在

                var userInfo = $cookieStore.get('userInfo');

                //判断是否登录
                if (userInfo.isLogin) {//已经登录
                    return callback(
                        {
                            success: true,
                            data: userInfo
                        }
                    )
                } else {//没有登录
                    return callback({
                        success: false,
                        data: ''
                    });
                }
            } else {//userInfo的cookie不存在
                if (UserAgentSvc.isWx) {//微信环境
                    if ($cookieStore.get('openid')) {//有openid的cookie
                        UserSvc.getUserInfoByOpenid($cookieStore.get('openid')).then(function success(data) {//获取用户信息
                            if (data.receiverMobile) {//如果有绑定手机号
                                return callback({
                                    success: true,
                                    data: data
                                });
                            } else {//如果没有绑定手机号
                                return callback({
                                    success: false,
                                    data: ''
                                });
                            }
                        });
                    } else {//没有openid的cookie
                        return callback({
                            success: false,
                            data: ''
                        });
                    }
                } else {//非微信环境
                    return callback({
                        success: false,
                        data: ''
                    });
                }
            }
        }
    };

    return service;
}]);