'use strict';

/*

inputData = {
tag:String,
data:Object[]
}

outputData = {
tag: String,
data: Object
}

isShow = bool;

 */

app.directive("appPicker", [function () {
    return {
        restrict: 'E',
        scope: {
            inputData: '=',
            outputData: '=',
            isShow: '='
        },
        templateUrl: "component_modules/picker/picker.html",
        link: function (scope, element, attrs) {

            scope.showWaitingIcon = false;//是否等待数据

            scope.isShow = false;

            scope.setPicker = function (picker) {//选定数据
                scope.outputData = picker;
                scope.isShow = false;
            };

            scope.setPickerHide = function () {//设置隐藏显示picker状态
                scope.isShow = false;
            };

            scope.$watch('inputData', function (n, o, scope) {//监听输入数据
                if (n !== o && n !== undefined) {
                    scope.showWaitingIcon = false;
                }else {
                    //scope.outputData = scope.inputData[0];
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