var OfficeUI = angular.module('OfficeUI');

OfficeUI.directive('dynamicEventHandling', function() {
    return {
        restrict: 'A',
        replace: 'true',
        link: function(scope, element, attributes) {
            var parameter = scope.$eval(attributes['ngcDynamicEventHandling']);

            var registeredEvent = $(this).OfficeUI.searchEvent(parameter);

            if (registeredEvent != null) {
                element.on(registeredEvent.handler, function() {
                    registeredEvent.action();
                });
            }
        }
    };
});
