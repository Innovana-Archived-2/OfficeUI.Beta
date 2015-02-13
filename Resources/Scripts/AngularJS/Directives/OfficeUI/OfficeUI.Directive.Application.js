// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name officeuiApplicationTitle
 *
 * @description
 * Renders the OfficeUI application on the place where this directive is being placed.
 */
OfficeUI.directive('officeuiApplicationTitle', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/OfficeUI.Beta/Resources/Data/Templates/OfficeUI.application.html'
    }
})