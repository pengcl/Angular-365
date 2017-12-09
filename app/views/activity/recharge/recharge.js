"use strict";

app.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // 设定路由
    $stateProvider
        .state('recharge', { //关于我们
            url: "/activity/recharge?mobile",
            templateUrl: "views/activity/recharge/recharge.html",
            controller: "rechargeController"
        });
}]).controller('rechargeController', ['$scope', '$stateParams', '$filter', '$timeout', '$location', '$cookieStore', 'UserSvc', 'ProductSvc', 'CouponSvc', 'PaySvc', 'ShareSvc', function ($scope, $stateParams, $filter, $timeout, $location, $cookieStore, UserSvc, ProductSvc, CouponSvc, PaySvc, ShareSvc) {

    $scope.feeLimitTo = 5;
    $scope.flowLimitTo = 5;

    if ($cookieStore.get('rechargeMobile')) {
        $scope.mobileView = $cookieStore.get('rechargeMobile');
    }

    if ($stateParams.mobile) {
        $scope.mobile = $stateParams.mobile;
    }

    ShareSvc.wxShare({
        title: '流量特惠充值，买一送一啦！',
        desc: '流量话费充值多优惠，更有多重好礼！尽在365领流量',
        link: 'http://app.ljker.com/activity/recharge',
        imgUrl: 'http://app.ljker.com/views/activity/follow/shareImg.jpg'
    });

    $scope.productType = 'flow';
    //是否属于默认选中商品
    $scope.isRobot = true;

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
    };

    $scope.getFlowMore = function (checked) {

        $scope.flowLimitTo = 100;
    };

    $scope.getFeeMore = function (checked) {

        $scope.feeLimitTo = 100;
    };

    $scope.getFlowLess = function (checked) {

        $scope.flowLimitTo = 5;
        $scope.feeLimitTo = 5;
    };

    $scope.getFeeLess = function (checked) {

        $scope.feeLimitTo = 5;
        $scope.flowLimitTo = 5;
    };

    if ($location.search().referrerId) {
        $scope.referrerId = $location.search().referrerId;
    } else {
        $scope.referrerId = "";
    }

    $scope.selectedFlowProd = function (checked, product, isMore, area_operator, e) {
        if (!checked) {
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: '请输入您的手机号码！',
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });
            return false;
        }

        $scope.isMore = isMore;

        $scope.flowMore = false;
        $scope.flowCoupons = "";
        $scope.flowProduct = product;

        $scope.flowCouponLength = 0;

        if (product.productName.indexOf('M') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1);
        }

        if (product.productName.indexOf('G') !== -1) {
            product.flowRate = (product.productName).substring(0, (product.productName).length - 1) + '000';
        }

        if ($scope.couponList) {
            if (area_operator === "广东联通") {
                if (product.flowRate >= 500 && $scope.couponList.length >= 1) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo;
                    $scope.flowCouponLength = 1;
                }

                if (product.flowRate > 3000 && $scope.couponList.length >= 2) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                    $scope.flowCouponLength = 2;
                }
            } else {
                if (product.flowRate >= 100 && $scope.couponList.length >= 1) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo;
                    $scope.flowCouponLength = 1;
                }

                if (product.flowRate > 300 && $scope.couponList.length >= 2) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                    $scope.flowCouponLength = 2;
                }
                if (product.flowRate >= 1000 && $scope.couponList.length >= 3) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo + "," + $scope.couponList[2].couponNo;
                    $scope.flowCouponLength = 3;
                }
                if (product.flowRate >= 4000 && $scope.couponList.length >= 5) {
                    $scope.flowCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo + "," + $scope.couponList[2].couponNo + "," + $scope.couponList[3].couponNo + "," + $scope.couponList[4].couponNo;
                    $scope.flowCouponLength = 5;
                }
            }
        } else {
            $scope.flowCoupons = "";
        }

        $scope.regionFlowProduct = product.regionProducts[0];
        if (e) {
            $scope.isRobot = false;
        }
    };

    $scope.selectedFeeProd = function (checked, product, isMore, e) {
        if (!checked) {
            $scope.dialog.open({
                show: true,
                title: "系统提示",
                body: '请输入您的手机号码！',
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });
            return false;
        }
        $scope.feeCoupons = "";
        $scope.feeProduct = product;

        $scope.feeCouponLength = 0;

        if ($scope.couponList) {
            if (product.salesPrice >= 50 && $scope.couponList.length >= 1) {
                $scope.feeCoupons = $scope.couponList[0].couponNo;
                $scope.feeCouponLength = 1;
            }

            if (product.salesPrice >= 100 && $scope.couponList.length >= 2) {
                $scope.feeCoupons = $scope.couponList[0].couponNo + "," + $scope.couponList[1].couponNo;
                $scope.feeCouponLength = 2;
            }
        } else {
            $scope.feeCoupons = "";
        }

        $scope.regionFeeProduct = product.regionProducts[0];
        if (e) {
            $scope.isRobot = false;
        }
    };

    /*$scope.$root.share = {
        homeLink: 'http://' + window.location.host + '/flow/list' + window.location.search,
        shareTitle: '移动、电信、联通三网支持，24小时自动充值',
        shareDisc: '当月有效，月底清零，2G/3G/4G网络通用',
        picUrl: 'http://' + window.location.host + '/images/flow/nativeShare.jpg'
    };*/

    $scope.flowDialog = function () {
        $scope.dialog.open({
            show: true,
            title: "",
            body: '充值流量包，即赠送等金额（按实际金额向下取整，最多30元）的流量包/话费充值通用优惠券，可用于下次充值或转赠给朋友使用。',
            buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
        });
    };
    $scope.feeDialog = function () {
        $scope.dialog.open({
            show: true,
            title: "",
            body: '话费充值面值50元送5元优惠券，面额100元送10元优惠券，多充多送（最多30元），优惠券流量包/话费充值通用，可用于下次流量包充值或转赠给朋友使用。',
            buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
        });
    };

    $scope.buyFlowProd = function (product, event) {
        $scope.regionFlowProduct = product;
    };

    $scope.buyFeeProd = function (product, event) {
        $scope.regionFeeProduct = product;
    };

    $scope.pay = function (mobileValid, product, regionProduct, coupons) {
        $scope.isSubmit = true;
        $scope.toast.show = true;
        if (!mobileValid) {
            $scope.toast.show = false;
            $scope.dialog.open({
                show: true,
                title: "",
                body: '请输入您的充值手机号码',
                buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
            });
            return false;
        }
        if (regionProduct) {

            PaySvc.flowPay($scope.mobile, product.productId, regionProduct.productFlowPriceId, $scope.flowList.area_operator, 'recharge', $scope.gh, encodeURIComponent('http://app.ljker.com/success?mobile=' + $scope.mobile + '&returnUrl=' + encodeURIComponent(window.location.href)), coupons, $scope.referrerId, $scope.category + $scope.productType).then(function success(data) {
                $scope.toast.show = false;
                if (data.result) {
                    window.location.href = data.payUrl;
                    //默认选中商品，点击下单时统计选择的商品
                    if ($scope.isRobot) {
                        /*writebdLog($scope.category, "_SelectPackage" + $scope.productType + product.sortNo + 'M', "渠道号", $scope.gh);*/
                    }
                } else {
                    $scope.dialog.open({
                        show: true,
                        title: "",
                        body: data.msg,
                        buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
                    });
                }
            });

        } else {
            $scope.toast.show = false;
        }

    };

    $scope.showTips = function () {
        $scope.dialog.open({
            show: true,
            title: '优惠券使用说明',
            body: '<p> 1、话费充值面值50元送5元优惠券，面额100元送10元优惠券，多充多送（最多30元）</p><p>2、优惠券可用于下次充值，适用于话费及流量，请在有效期内使用。</p>',
            buttons: [{show: true, txt: '我知道了', eventId: 'hello'}]
        })
    };

    $scope.taggleShow = function (target) {
        $(target).slideToggle(500);
    };

    $scope.showOverlay = function (target) {
        $scope.$root.Overlay.open($(target).html());
    };

    //只有输入手机号码才记录到闭环
    $scope.inputMobile = function (mobile) {
        if (mobile == undefined || mobile == "" || mobile.length <= 10) return;
    };

    $scope.setProductType = function (type) {
        $scope.productType = type;
        $scope.regionProduct = null;
    };

    var rebuildData = function (data, compareData) {//data 待对比对象 compareData 对比对象
        if (compareData) {//如果 compareData === true 进行对比
            $.each(data.data, function (i, k) {
                k.stock = false;
                $.each(compareData.data, function (item, key) {
                    if (k.productName === key.productName) {
                        k.regionProducts = key.regionProducts;
                        k.stock = true;
                    }
                });
            });
        } else {//如果 compareData === false 不进行对比
            $.each(data.data, function (i, k) {
                k.stock = true;
            });
        }

        data.area_operator = compareData.area_operator;

        return data;
    };

    var tempFlowList, tempFeeList;

    var getDefault = function (data) {
        var index = "";
        $.each(data, function (i, k) {
            var prodName = k.productName.substr(0, k.productName.length - 1);
            if (k.stock) {
                if (index == "") {
                    index = i;
                }
                if (prodName >= 100) {
                    index = i;
                    return false;
                }
            }
        });
        return index;
    };

    ProductSvc.getFlows('').then(function success(data) {
        tempFlowList = data;
    }).then(function success() {
        ProductSvc.getFees('').then(function success(data) {
            tempFeeList = data;
        }).then(function success() {
            $scope.$watch('mobileValid', function (n, o, $scope) {
                if (n) {
                    $("#mobileView").blur();
                    UserSvc.getUserInfoByMobile(n).then(function success(data) {//获取用户信息
                        $scope.userInfo = data;
                        if ($scope.userInfo.mobile) {
                            CouponSvc.getCouponList($scope.userInfo.mobile).then(function success(data) {

                                $scope.couponList = $filter('filter')(data.couponList, {
                                    isUsed: 0,
                                    isOverdue: 0,
                                    type: 'DK'
                                });

                                ProductSvc.getFlows(n).then(function success(data) {
                                    $scope.flowList = rebuildData(tempFlowList, data);

                                    var _flowIndex = getDefault($scope.flowList.data);

                                    if (_flowIndex > 6) {
                                        $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], false);
                                    } else {
                                        if (_flowIndex !== "") {
                                            $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], true);
                                        }
                                    }
                                });
                                ProductSvc.getFees(n).then(function success(data) {
                                    $scope.feeList = rebuildData(tempFeeList, data);

                                    var _feeIndex = getDefault($scope.feeList.data);

                                    if (_feeIndex > 6) {
                                        $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], false);
                                    } else {
                                        if (_feeIndex !== "") {
                                            $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], true);
                                        }
                                    }

                                });

                            });
                        } else {
                            ProductSvc.getFlows(n).then(function success(data) {
                                $scope.flowList = rebuildData(tempFlowList, data);

                                var _flowIndex = getDefault($scope.flowList.data);

                                if (_flowIndex > 6) {
                                    $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], false);
                                } else {
                                    if (_flowIndex !== "") {
                                        $scope.selectedFlowProd(true, $scope.flowList.data[_flowIndex], true);
                                    }
                                }
                            });
                            ProductSvc.getFees(n).then(function success(data) {
                                $scope.feeList = rebuildData(tempFeeList, data);

                                var _feeIndex = getDefault($scope.feeList.data);

                                if (_feeIndex > 6) {
                                    $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], false);
                                } else {
                                    if (_feeIndex !== "") {
                                        $scope.selectedFeeProd(true, $scope.feeList.data[_feeIndex], true);
                                    }
                                }

                            });
                        }
                    });
                } else {
                    $scope.flowList = rebuildData(tempFlowList, false);
                    $scope.selectedFlowProd(true, $scope.flowList.data[0], true);
                    $scope.feeList = rebuildData(tempFeeList, false);
                    $scope.selectedFeeProd(true, $scope.feeList.data[0], true);
                }
            });
        });
    });

    $scope.$watch('mobileView', function (n, o, $scope) {
        if (n) {
            $scope.isSubmit = false;
            var value = n;
            value = value.replace(/\s*/g, "");
            var result = [];
            for (var i = 0; i < value.length; i++) {
                if (i == 3 || i == 7) {
                    result.push(" " + value.charAt(i));
                }
                else {
                    result.push(value.charAt(i));
                }
            }
            $scope.mobileView = result.join("");
            $scope.mobile = value;
            $cookieStore.put('rechargeMobile', $scope.mobileView);
        } else {
            $scope.mobile = "";
        }
    });

    $scope.$watch('mobile', function (n, o, $scope) {

        $scope.couponList = 0;
        $scope.flowCouponLength = 0;
        $scope.feeCouponLength = 0;

        $timeout(function () {
            if (n !== undefined && n.length == 11 && $scope.salesForm.mobile.$valid) {
                $scope.mobileValid = $scope.mobile;
            } else {
                $scope.mobileValid = false;
            }
        });

    });
}]);

