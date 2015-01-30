/* Loads the module 'OfficeUI'. */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name scroll
 *
 * @description
 * The 'scroll' directive allows a method to be executed when scrolling.
 * The method that's being executed is 'ribbonScroll'.
 *
 * @element ANY
 *
 * @example
 *  <example module="OfficeUIRibbon">
 *    <file name="index.html">
 *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon" scroll></body>
 *    </file>
 *  </example>
 */
OfficeUIRibbon.directive('scroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('DOMMouseScroll mousewheel', function (e) {
                scope.ribbonScroll(e);

                e.preventDefault();
            });
        }
    }
});