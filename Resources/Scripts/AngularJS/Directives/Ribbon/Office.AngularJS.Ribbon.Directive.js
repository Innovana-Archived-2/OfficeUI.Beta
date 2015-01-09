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
        replace: false,
        scope: {
            data: '@'
        },
        templateUrl: function(element, attributes) {
            return attributes.templateurl;
        }
    }
});

/* Defines a directive called 'ngcCollapse'. This directive must be called as an attribute. */
OfficeUIRibbon.directive('ngcCollapse', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            var parameters = scope.$eval(attributes['ngcCollapse']);
            
            // Bind an event when you click on the icon.
            $(element).on('click', function (e) { 
                var animatedElement = $(parameters.area);

                // Rise the curtain is it's not showed.
                if (scope.isShowed()) {
                    $(element).parent().curtain(null, function() {
                        // Sets the ribbon as hidden.
                        scope.setRibbonHidden();
                    });
                } else if (scope.isVisible()) {
                    animatedElement.animate({'margin-top': '92px'}, 250, function() {
                        
                        // Remove the margin-top again right now since the absolute class will be removed, and otherwise the element will be displayed too low.
                        animatedElement.css('margin-top', '0px');
                        
                        // Sets the ribbon as showed.
                        scope.setRibbonShowed();
                    });
                    
                    $(element).parent().curtain({
                        direction: 'down',
                        height: 92
                    }, function() {
                        
                    });
                }
            });
        }
    }
});