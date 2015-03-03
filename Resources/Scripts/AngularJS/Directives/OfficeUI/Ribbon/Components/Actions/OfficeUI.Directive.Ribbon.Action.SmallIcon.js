// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonActionSmallIcon
 *
 * @description
 * Renders the OfficeUI small icon action on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonActionSmallIcon', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/Resources/Data/Templates/Ribbon/Components/Actions/OfficeUI.Ribbon.Action.SmallIcon.html'
    }
})