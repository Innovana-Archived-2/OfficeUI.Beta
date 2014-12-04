/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* Defines a directive called 'ribbon'. This directive must be called as an element. */
OfficeUIRibbon.directive('ribbon', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            template: '@template'
        },
        link: function(scope, element, attribute) { },
        templateUrl: '/Resources/Templates/Ribbon.html'
    };
});

/* Defines a directive called 'ngcRibbon'. According to AngularJS conventions, this directive must be called as 'ngc-ribbon'. */
OfficeUIRibbon.directive('ngcRibbon', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attribute) {
            // Get and parse the required parameters.
            var parameters = scope.$eval(attribute['ngcRibbon']);

            // Perform some validation.
            if (parameters.contentSelector == undefined) {
                console.error('The parameter \'contentSelector\' is a required parameter on the \'ngc-ribbon\' directive.');
            }

            if (parameters.tabSelector == undefined) {
                console.error('The parameter \'tabSelector\' is a required parameter on the \'ngc-ribbon\' directive.');
            }

            // Call the 'Initialize' function on the AngularJS controller.
            scope.Initialize(scope, parameters.contentSelector, parameters.tabSelector);
        }
    }
});

/* Defines a directive called 'ngcScroll'. According to AngularJS conventions, this directive must be called as 'ngc-scroll'. */
OfficeUIRibbon.directive('ngcScroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('DOMMouseScroll mousewheel', function (e) { 
                scope.ribbonScroll(e); // Execute the function 'ribbonScroll'.

                scope.refresh(); // Update the view.
            });
        }
    }
});

/* Defines a directive called 'ngcCollapse'. According to the AngularJS conventions, this directive must be called as 'ngc-collapse'. */
OfficeUIRibbon.directive('ngcCollapse', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            // Get and parse the required parameters.
            var parameters = scope.$eval(attributes['ngcCollapse']);
            $(element).on('click', function (e) {
                // If the ribbon is showed, we should hide it.
                if (scope.ribbonState() == 1) {
                    element.parent().parent().curtain({ duration: 250 }, function() {
                        CreateCookie(collapsedCookieName, 'true', 365);
                        scope.setRibbonState(2);
                    });
                }
                
                // If the ribbon is hidden, we should show it.
                if (scope.ribbonState() == 3) {
                    CreateCookie(collapsedCookieName, 'false', 365);
                    
                    element.parent().parent().curtain({direction: 'down', height: 92, duration: 250 });
                    
                    var officeUIContents = $(parameters.area).addClass('officeui-position-absolute').animate({top: 146}, 250, function () {
                        $(this).removeClass('officeui-position-absolute');
                        $(this).css('top', 'auto');
                        scope.setRibbonState(1);
                    });
                }
            });
        }
    }
});
