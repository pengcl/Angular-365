appServices.factory("CouponSvc", ['$http', '$q', function ($http, $q) {
    var service = {};

    service.getCouponList = function (recieverMobile) {//获取订单列表 promise对象
        var d = $q.defer();
        $http.get(apiConfig.apiHost + '/product/getCouponList.ht?recieverMobile=' + recieverMobile).success(function (data) {
            var data = angular.fromJson(data);
            var isOverdueCount = 0;
            var isUsedCount = 0;
            var length = data[0].couponList.length;
            var couponList = {
                "length": length,
                "couponList": []
            };

            $.each(data[0].couponList, function (i, k) {
                var isOverdue;
                if (k.validEndTime.time - Date.parse(new Date()) >= 0) {//没过期
                    isOverdue = 0;
                } else {//已过期
                    isOverdue = 1;
                    isOverdueCount = isOverdueCount + 1;
                }
                if (k.isUsed == 1) {
                    isUsedCount = isUsedCount + 1
                }
                var obj = {
                    couponNo: k.couponNo,
                    activeUsername: k.activeUsername,
                    couponBatchName: k.couponBatchName,
                    validStartTime: k.validStartTime.time,
                    validEndTime: k.validEndTime.time,
                    isUsed: k.isUsed,
                    callbackUrl: k.callbackUrl,
                    type: k.couponBatchType,
                    isOverdue: isOverdue
                };
                couponList.couponList.push(obj);
            });

            couponList.isOverdueCount = isOverdueCount;
            couponList.isUsedCount = isUsedCount;
            return d.resolve(couponList);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    service.getCouponDetail = function (recieverMobile, couponNo) {
        var d = $q.defer();
        var couponDetail;
        service.getCouponList(recieverMobile).then(function success(data) {
            $.each(data.couponList, function (i, k) {
                if (k.couponNo === couponNo) {
                    couponDetail = k;
                }
            });
            return d.resolve(couponDetail);
        });
        return d.promise;
    };

    service.send = function (couponNo, fromMobile, toMobile) {
        var d = $q.defer();
        $http.jsonp(apiConfig.apiHost + '/product/couponDonation.ht?couponNos=' + couponNo + '&oNumber=' + fromMobile + '&nNumber=' + toMobile + '&callback=JSON_CALLBACK').success(function (data) {
            return d.resolve(data);
        }).error(function (error) {
            d.reject(error);
        });
        return d.promise;
    };

    return service;
}]);