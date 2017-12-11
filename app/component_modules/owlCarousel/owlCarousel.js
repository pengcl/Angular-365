'use strict';

app.directive("owlCarousel", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {

        }
    };
}]).directive("carouselItem", ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            if (scope.$last) {
                $(element).parent().owlCarousel({
                    nav: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    items: 1
                });
            }
        }
    };
}]);