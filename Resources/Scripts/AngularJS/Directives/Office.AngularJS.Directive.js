/* Loads the AngularJS module 'Office'. */
var OfficeUI = angular.module('Office');

/* Defines a directive called 'dynamic-event-handler'. This directive must be called as an element. */
OfficeUI.directive('ngcDynamicEventHandling', function() {
    return {
        restrict: 'A',
        replace: 'true', 
        link: function(scope, element, attributes) {
            var parameter = scope.$eval(attributes['ngcDynamicEventHandling']); // Get the parameters passed to this directive.
            
            // Check if an event is attached to this object.
            var registeredEvent = $(this).OfficeUI.searchEvent(parameter);
            
            // An attached event has been found, so let's register it.
            if (registeredEvent != null) {
                element.on(registeredEvent.handler, function() { 
                    registeredEvent.action();
                });
            }
        }
    };
});