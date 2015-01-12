/* Loads the AngularJS module 'OfficeUI.Ribbon'.
 Parameters:
 Name:           The name of the AngularJS module.

 Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
 This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
 */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* Defines a directive called 'applicationMenu'. This directive must be called as an element. */
OfficeUIRibbon.directive('applicationMenu', function() {
    return {
        restrict: 'A',
        replace: false,
        link: function(scope, element, attributes) {
            element.on('click', function(e) {
                console.log('I have clicked on the element.');
            });
        }
    }
});