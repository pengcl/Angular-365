app.directive("userTracker", [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).click(function () {
                writebdLog(appName + '_' + scope.state.name, '_' + attrs.userTracker);
            });
        }
    };
}]);
