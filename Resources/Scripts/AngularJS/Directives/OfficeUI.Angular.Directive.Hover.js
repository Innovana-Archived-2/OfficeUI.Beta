var OfficeUIRibbon = angular.module('OfficeUIRibbon');

OfficeUIRibbon.directive('hover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var functionToExecute = element.attr('hover');

            element.bind("mouseenter", function (e) {
                scope.$apply(functionToExecute)
            });
        }
    };
});