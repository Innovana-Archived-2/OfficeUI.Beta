// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbon
 *
 * @description
 * Renders the OfficeUI ribbon on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbon', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/Resources/Data/Templates/Ribbon/OfficeUI.Ribbon.html'
    }
})