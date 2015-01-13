/* Loads the AngularJS module 'OfficeUI.Ribbon'.
 Parameters:
 Name:           The name of the AngularJS module.

 Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
 This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
 */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* Defines a directive called 'applicationMenu'. This directive must be called as an element. */
OfficeUIRibbon.directive('applicationMenuContents', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            url: '@'
        },
        link: function(scope, element, attributes) {
            scope.$watch('url', function(value) { 
                scope.contentUrl = value;
            });
        },
        template: function() {
            return '<div ng-include="contentUrl"></div>';
        }
    }
}); 