app.directive("userTracker", ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).click(function () {
                writebdLog(appName + '_' + scope.state.name, '_' + attrs.userTracker);
            });
        }
    };
}]);
