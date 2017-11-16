'use strict';

app.directive("ad", ['$http', function ($http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: "components/ad/ad.html",
        link: function (scope, element, attrs) {

            if(attrs.stateName !== 'seckill'){
                $http.get(apiConfig.apiHost + '/activity/getQgProduct.ht').success(function (data) {
                    data = angular.fromJson(data)[0];
                    if (data.falg) {
                        scope.adShow = true;
                        scope.ad = data.recent;
                    }
                }).error(function (error) {
                    console.log(error);
                });
            }else {
                scope.adShow = false;
            }
        }
    };
}]);