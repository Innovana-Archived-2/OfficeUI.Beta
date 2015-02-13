// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonContextualTabs
 *
 * @description
 * Renders the OfficeUI ribbon contextual tabs on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonContextualTabs', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/OfficeUI.Beta/Resources/Data/Templates/Ribbon/Components/OfficeUI.Ribbon.Tabs.Contextual.html'
    }
})