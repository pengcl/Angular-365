'use strict';

app.directive("toast", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "component_modules/toast/toast.html",
        link: function (scope, element, attrs) {
            scope.toast = {
                show: false
            };
        }
    };
}]);