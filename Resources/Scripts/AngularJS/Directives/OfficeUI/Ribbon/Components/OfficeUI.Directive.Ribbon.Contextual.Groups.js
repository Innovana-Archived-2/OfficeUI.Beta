// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonContextualGroups
 *
 * @description
 * Renders the OfficeUI ribbon contextual groups on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonContextualGroups', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/Resources/Data/Templates/Ribbon/Components/OfficeUI.Ribbon.ContextualGroups.html'
    }
})
