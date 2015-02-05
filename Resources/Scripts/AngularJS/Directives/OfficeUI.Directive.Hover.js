/* Loads the module 'OfficeUIRibbon'. */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name hover
 *
 * @description
 * The 'hover' directive allows a method to be executed when hovering on an element.
 *
 * @element ANY
 *
 * @example
 *  <example module="OfficeUIRibbon">
 *    <file name="index.html">
 *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon" hover="function()"></body>
 *    </file>
 *  </example>
 */
OfficeUIRibbon.directive('hover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var functionToExecute = element.attr('hover');

            element.bind("mouseenter", function (e) {
                scope.$apply(functionToExecute)
            });
        }
    };
});