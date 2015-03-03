// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name stopPropagation
 *
 * @description
 * The 'stopPropagation' directive allows an event to stop propagating throughout the flow.
 *
 * @element Attribute.
 *
 * @parameters {string}
 *              Defines the event that should stop propagating.
 */
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