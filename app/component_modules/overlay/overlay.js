'use strict';

app.directive("appOverlay", ['$http', '$compile', '$timeout', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        templateUrl: "component_modules/overlay/overlay.html",
        link: function (scope, element, attrs) {
            var $overlayHook = $("#overlay-hook");
            scope.Overlay = {
                open: function (template) {//template,需要传入的html
                    //console.log(scope.simList);
                    $overlayHook.html(template);
                    scope.$emit('container','overlay-open');
                },
                openCompile: function (template) {
                    //console.log(scope.simList);
                    $compile($overlayHook.html(template))(scope);
                    scope.$emit('container','overlay-open');
                },
                close: function () {
                    scope.$emit('container','');
                    $overlayHook.html("");
                }
            };
        }
    };
}]);