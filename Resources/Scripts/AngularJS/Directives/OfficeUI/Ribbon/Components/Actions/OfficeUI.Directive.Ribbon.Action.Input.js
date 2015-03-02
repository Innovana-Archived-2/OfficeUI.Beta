// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonActionInput
 *
 * @description
 * Renders the OfficeUI input action on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonActionInput', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/OfficeUI.Beta/Resources/Data/Templates/Ribbon/Components/Actions/OfficeUI.Ribbon.Action.Input.html'
    }
})
