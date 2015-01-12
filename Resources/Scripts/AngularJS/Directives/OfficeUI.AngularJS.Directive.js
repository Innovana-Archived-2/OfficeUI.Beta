/* Loads the AngularJS module 'Office'. */
var OfficeUI = angular.module('OfficeUI');

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