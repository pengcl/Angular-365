'use strict';

app.directive("orderListItem", ['PaySvc', function (PaySvc) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            orderListItem: '='
        },
        templateUrl: "component_modules/orderListItem/orderListItem.html",
        link: function (scope, element, attrs) {

            scope.dialog = function (show, title, body, btnTxt) {
                //scope.$root.dialog.open(show, title, body, btnTxt);
            };
            scope.setCertification = function (e) {
                if (scope.appAuth.isWeiXin) {

                } else {
                    e.preventDefault();
                    var _body = '<img width="50%" src="/templates/fenxiao/pages/member/public/images/qrcode.jpg"><br><p>请长按上图二维码，进入公众号实名认证。</p>';
                    //scope.$root.dialog.open(true, '实名认证', _body, ['我知道了', '']);
                }
            };
            scope.buyNow = function (orderId, payType) {
                //scope.$root.loadingToast.open(true);
                PaySvc.pay(orderId, payType).then(function success(data) {
                    if (data.result) {
                        //scope.$root.loadingToast.open(false);
                        window.location.href = data.payUrl;
                    } else {
                        //scope.$root.loadingToast.open(false);
                        scope.$root.dialog.open(true, '系统提示', data, ['我知道了', '']);
                    }
                });
            };

            //点击统计
            scope.writeLog = function (value) {
                //writebdLog(scope.$root.state.params.category, "_" + value, "渠道号", scope.$root.state.params.gh);
            }
        }
    };
}]);