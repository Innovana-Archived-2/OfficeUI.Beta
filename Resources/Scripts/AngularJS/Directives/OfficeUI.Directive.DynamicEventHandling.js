// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name dynamicEventHandling
 *
 * @description
 * The dynamicEventHandling directive allows you to attach an event to an element.
 *
 * @element Attribue.
 */
OfficeUI.directive('dynamicEventHandling', function() {
    return {
        restrict: 'A',
        replace: 'true',
        link: function(scope, element, attributes) {
            var parameter = scope.$eval(attributes['dynamicEventHandling']);

            var registeredEvent = $(this).OfficeUI.searchEvent(parameter);

            if (registeredEvent != null) {
                element.on(registeredEvent.handler, function() {
                    registeredEvent.action();
                });
            }
        }
    };
});
