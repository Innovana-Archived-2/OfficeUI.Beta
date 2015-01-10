/* Loads the AngularJS module 'Office'. */
var OfficeUI = angular.module('OfficeUI');

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

// Provides a way to stop propagating an event.
OfficeUI.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});

// Provides a way to show a menu when clicking on the holder.
OfficeUI.directive('ngcMenuHolder', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind("click", function (e) {
                // Clear the timeout handle that's used to show the tooltips.
                clearTimeout($.fn.OfficeUI.waitHandlerTooltip);

                // Only enable the tab when the plugin is configured to do so.
                var parameters = scope.$eval(attributes['ngcMenuHolder']);
                var menu = parameters.menu;

                angular.element(menu).show();
            });
        }
    };
});