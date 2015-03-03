// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonActionBigIcon
 *
 * @description
 * Renders the OfficeUI big icon action on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonActionBigIcon', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/Resources/Data/Templates/Ribbon/Components/Actions/OfficeUI.Ribbon.Action.BigIcon.html'
    }
})

