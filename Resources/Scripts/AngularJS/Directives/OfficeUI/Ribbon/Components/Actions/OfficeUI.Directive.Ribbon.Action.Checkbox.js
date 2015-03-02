// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonActionCheckbox
 *
 * @description
 * Renders the OfficeUI checkbox action on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonActionCheckbox', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/OfficeUI.Beta/Resources/Data/Templates/Ribbon/Components/Actions/OfficeUI.Ribbon.Action.Checkbox.html'
    }
})
