'use strict';

/* Filters */
appFilters.filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

appFilters.filter('orderState', function () {//订单状态
    return function (type) {
        if (type == 0) {
            return "未支付";
        }
        if (type == 1) {
            return "已支付";
        }
        if (type == 2) {
            return "配送中";
        }
        if (type == 3) {
            return "受理中";
        }
        if (type == 4) {
            return "已完成";
        }
        if (type == 5) {
            return "已失效";
        }
    }
});

appFilters.filter('flowCoupon', function () {
    return function (number) {
        if (number <= 30) {
            return Math.floor(number);
        } else {
            return 30;
        }
    }
});

appFilters.filter('feeCoupon', function () {
    return function (price, max) {
        for (var i = 0; i <= max / 5; i++) {
            if (i * 50 == price) {
                return i * 5;
            }
            if (i * 50 > price) {
                return (i - 1) * 5;
            }
            if (i * 50 < price && i * 5 >= max) {
                return max;
            }
        }
    }
});

appFilters.filter('flowSalesPrice', function () {
    return function (data) {
        var price = data[0].salesPrice;
        $.each(data, function (i, k) {
            if(k.salesPrice < price){
                price = k.salesPrice;
            }
        });
        return price;
    }
});