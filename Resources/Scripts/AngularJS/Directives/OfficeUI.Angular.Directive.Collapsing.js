var OfficeUIRibbon = angular.module('OfficeUIRibbon');

OfficeUIRibbon.directive('ngcCollapse', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            var parameters = scope.$eval(attributes['ngcCollapse']);

            $(element).on('click', function (e) {
                var animatedElement = $(parameters.area);

                if (scope.isShowed()) {
                    $(animatedElement).animate({'margin-top': '53px'}, $.fn.OfficeUI.Defaults.duration);
                    $(element).parent().parent().curtain(null, function() {
                        scope.setRibbonHidden();
                    });
                } else if (scope.isVisible()) {
                    animatedElement.animate({'margin-top': '146px'}, $.fn.OfficeUI.Defaults.duration, function() {

                        scope.setRibbonShowed();
                    });

                    $(element).parent().parent().curtain({
                        direction: 'down',
                        height: 92
                    }, function() {

                    });
                }
            });
        }
    }
});