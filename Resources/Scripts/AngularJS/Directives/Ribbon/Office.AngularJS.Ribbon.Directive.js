/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeRibbon');

/* Defines a directive called 'ribbon'. This directive must be called as an element. */
OfficeUIRibbon.directive('ribbon', ['$templateCache', function($templateCache) {
    return {
        restrict: 'E',
        replace: false,
        compile: function(element, attribute, transclude) {
            var html = $templateCache.get(attribute.templateUrl);
            element.html(html);
            console.log(html);
            $scope.apply();
        }
    }
}]);