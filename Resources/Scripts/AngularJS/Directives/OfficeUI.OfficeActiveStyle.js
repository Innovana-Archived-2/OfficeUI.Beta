/* Loads the 'OfficeUIRibbon' module because it's on this module that the directives will be attached. */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* @ngdoc Directive
 * @name officeActiveStyle
 * @restrict A
 *
 * @description
 * The 'officeActiveStyle' directive allows you to set CSS style on an HTML element conditionally.
 *
 * @element ANY
 * @param {expression} officeActiveStyle
 *
 * {@link guide/expression Expression} which evals to an object whose keys are css style names and corresponding values
 * for those css keys.
 *
 * Since some CSS style names are not valid keys for an object, they must be quoted.
 * See the 'background-color' style in the example below.
 */
OfficeUIRibbon.directive('officeActiveStyle', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {

        }
    };
});
