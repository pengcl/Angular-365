app.directive("loadNext", [function () {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            inputDataTag: '='
        },
        templateUrl: "component_modules/loadMore/loadNext/loadNext.html",
        link: function (scope, element, attrs) {

            scope.showWaitingIcon = false;//是否等待数据

            if (scope.pageSize) {
                scope.pageSize = attrs.pageSize;
            } else {
                scope.pageSize = 10;
            }

            scope.dataInit = function () {
                scope.selPage = 1;
                scope.pages = Math.ceil(scope.inputData.length / scope.pageSize); //分页数
                scope.outputData = scope.inputData.slice(0, scope.pageSize);

                //console.log(scope.outputData);
            };

            scope.setData = function () {
                scope.outputData = scope.inputData.slice((scope.pageSize * (scope.selPage - 1)), (scope.selPage * scope.pageSize));
            };

            scope.selectPage = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.setData();
            };

            scope.selectMore = function (page) {
                //不能小于1大于最大
                if (page < 1 || page > scope.pages) return;

                scope.selPage = page;
                scope.outputData = scope.inputData.slice(0, (scope.selPage * scope.pageSize));
            };

            //上一页
            scope.Previous = function () {
                scope.selectPage(scope.selPage - 1);
            };
            //下一页
            scope.Next = function () {
                scope.selectPage(scope.selPage + 1);
            };

            scope.More = function () {
                scope.selectMore(1 + scope.selPage);
            };

            scope.$watch('inputData', function (n, o, scope) {//监听输入数据
                if (n !== o && n !== undefined) {
                    scope.dataInit();
                }
            }, true);

            /*scope.$watch('outputData', function (n, o, scope) {//监听输出数据
                if (n !== o && n !== undefined) {
                    scope.showWaitingIcon = true;
                }
            }, true);*/
        }
    };
}]);