
app.directive("topNav", [function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "component_modules/topNav/topNav.html",
        link: function (scope, element, attrs) {

            scope.navItem = JSON.parse(attrs.navItem);
            scope.$root.title = scope.navItem.title;

            scope.back = function () {
                history.back();
            };

            scope.menu = function (open) {
                scope.$emit('menuEvent', true);
            };

            scope.getBill = function (mobile) {
                scope.$emit('navEvent', {navType: 'bill', mobile: mobile});
            }


            /*scope.$on('$destroy', function() {
                console.log("destroy");
            });*/
        }
    };
}]);
