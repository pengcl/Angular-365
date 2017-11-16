'use strict';

app.directive("productItem", [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            productItem: '=',
            totalAmount: '=',
            buyMobile: '=',
            buyerMemo:'='
        },
        templateUrl: "component_modules/orderListItem/productItem/productItem.html",
        link: function (scope, element, attrs) {
        }
    };
}]);
