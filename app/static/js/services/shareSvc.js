"use strict";

appServices.factory('ShareSvc', ['$q', '$http', function ($q, $http) {
    var service = {};

    service.wxShare = function (config) {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: config.title, // 分享标题
                link: config.link, // 分享链接
                imgUrl: config.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (config.shareSuccess && typeof config.shareSuccess === "function"){
                        return config.shareSuccess('success');
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (config.shareSuccess && typeof config.shareSuccess === "function"){
                        return config.shareCancel('cancel');
                    }
                }
            });

            wx.onMenuShareAppMessage({
                title: config.title, // 分享标题
                desc: config.desc, // 分享描述
                link: config.link, // 分享链接
                imgUrl: config.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (config.shareSuccess && typeof config.shareSuccess === "function"){
                        return config.shareSuccess('success');
                    }

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if (config.shareSuccess && typeof config.shareSuccess === "function"){
                        return config.shareCancel('cancel');
                    }
                }
            });
        });
    };

    service.getInvite = function (memberId) {
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/share/invite.ht?memberId=' + memberId).success(function (data) {
            return d.resolve(angular.fromJson(data));
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);