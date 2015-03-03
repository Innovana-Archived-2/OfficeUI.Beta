// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name officeuiRibbonTabs
 *
 * @description
 * Renders the OfficeUI ribbon tabs on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiRibbonTabs', function () {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/Resources/Data/Templates/Ribbon/Components/OfficeUI.Ribbon.Tabs.html'
    }
})