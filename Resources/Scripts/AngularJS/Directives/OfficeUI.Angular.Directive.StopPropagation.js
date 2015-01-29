/* Loads the module 'OfficeUI'. */
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name stopPropagation
 *
 * @description
 * The 'stopPropagation' directive allows an event to stop propagating throughout the flow.
 *
 * @element ANY
 *
 * @parameters {string}
 *              Defines the event that should stop propagating.
 *
 * @example
 *  <example module="OfficeUI">
 *    <file name="index.html">
 *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon" stop-propagation="click"></body>
 *    </file>
 *  </example>
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
