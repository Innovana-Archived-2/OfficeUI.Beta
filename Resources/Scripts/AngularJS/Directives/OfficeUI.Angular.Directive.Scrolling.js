var OfficeUIRibbon = angular.module('OfficeUIRibbon');

OfficeUIRibbon.directive('scroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('DOMMouseScroll mousewheel', function (e) {
                scope.ribbonScroll(e);

                e.preventDefault();
            });
        }
    }
});