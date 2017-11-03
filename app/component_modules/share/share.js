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
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //$this.show = false;
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
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    //$this.show = false;
                }
            });
        });
    };

    return service;
}]);