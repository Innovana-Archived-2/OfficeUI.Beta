/* Loads the AngularJS module 'Office'. */
var OfficeUI = angular.module('OfficeUI');

// Provides a way to stop propagating an event.
OfficeUI.directive('stopPropagation', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopPropagation, function (e) {
                e.stopPropagation();
            });
        }
    };
});