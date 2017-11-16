'use strict';

app.directive("appDialog", ['$timeout', function ($timeout) {
    return {
        restrict: 'E',
        templateUrl: "component_modules/dialog/dialog.html",
        link: function (scope, element, attrs) {
            scope.dialog = {
                show: false,
                title: '',
                body: '',
                buttons: [
                    {
                        show: false,
                        txt: '',
                        eventId: ''
                    },
                    {
                        show: false,
                        txt: '',
                        eventId: ''
                    }
                ],
                open: function (config) {
                    console.log(config);
                    this.show = config.show;
                    this.title = config.title;
                    this.body = config.body;
                    this.buttons = config.buttons;
                },
                close: function (eventId) {
                    this.show = false;
                    scope.$emit('appDialog', eventId);
                }
            };
        }
    };
}]);