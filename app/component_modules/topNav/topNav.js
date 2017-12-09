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

            scope.watch = false;

            scope.showWatch = function (state) {
                scope.watch = state;
            }

            /*scope.$on('$destroy', function() {
                console.log("destroy");
            });*/
        }
    };
}]);
