/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* Defines a directive called 'ngcScroll'. According to AngularJS conventions, this directive must be called as 'ngc-scroll'.
   This directive can only be placed as an attribute and will fire when you scroll on the element which is being marked with this
   directive. */
OfficeUIRibbon.directive('ngcScroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            element.on('DOMMouseScroll mousewheel', function (e) { 
                scope.ribbonScroll(e);
            });
        }
    }
});

/* Defines a directive called 'ngcHide'. According to the AngularJS conventions, this directive must be called as 'ngc-hide'.
   This directive can only be placed as an attribute and will fire when you click on the element which is being marked with this 
   directive. */
OfficeUIRibbon.directive('ngcHide', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            element.on('click', function (e) {
                var tabContentsElement = element.parent().parent(); // Gets the 2nd parent element, this is the element hat holds the contents of the ribbon and which should be hidden.
                
                tabContentsElement.curtain({ duration: 250 }, function() {
                    scope.collapseRibbon('hide');
                });
            });
        }
    }
});

/* Defines a directive called 'ngcShow'. According to the AngularJS conventions, this directive must be called as 'ngc-show'.
   This directive can only be placed as an attribute and will fire when you click on the element which is being marked with this 
   directive. */
OfficeUIRibbon.directive('ngcShow', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            element.on('click', function (e) {
                    scope.collapseRibbon('show');
            });
        }
    }
});