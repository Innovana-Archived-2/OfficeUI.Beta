/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeRibbon');

/* Defines a directive called 'ribbon'. This directive must be called as an element. */
OfficeUIRibbon.directive('ribbon', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function(element, attributes) {
            return attributes.templateurl;
        }
    }
});