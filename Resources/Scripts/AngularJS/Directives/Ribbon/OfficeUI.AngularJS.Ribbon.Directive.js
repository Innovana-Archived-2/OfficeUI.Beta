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
            data: '@'
        },
        templateUrl: function(element, attributes) {
            return attributes.templateurl;
        }
    }
});

/* Defines a directive called 'ngcScroll'. This directive must be called as an attribute. */
OfficeUIRibbon.directive('ngcScroll', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('DOMMouseScroll mousewheel', function (e) {
                scope.ribbonScroll(e); // Execute the function 'ribbonScroll'.

                e.preventDefault(); // Prevent the window from scrolling when scrolling on the ribbon tabs to change tabs.
            });
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
                    $(animatedElement).animate({'margin-top': '53px'}, $.fn.OfficeUI.Defaults.duration);
                    $(element).parent().parent().curtain(null, function() {
                        // Sets the ribbon as hidden.
                        scope.setRibbonHidden();
                    });
                } else if (scope.isVisible()) {
                    animatedElement.animate({'margin-top': '146px'}, $.fn.OfficeUI.Defaults.duration, function() {

                        // Sets the ribbon as showed.
                        scope.setRibbonShowed();
                    });
                    
                    $(element).parent().parent().curtain({
                        direction: 'down',
                        height: 92
                    }, function() {
                        
                    });
                }
            });
        }
    }
});

// Provides a way to set a tab active when you hover on it.
OfficeUIRibbon.directive('ngcActiveTabOnHover', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind("mouseenter", function (e) {
                // Only enable the tab when the plugin is configured to do so.
                if ($.fn.OfficeUI.Defaults.changeActiveTabOnHover) {
                    scope.setActiveTab(element.attr('id'));
                }
            });
        }
    };
});

// Provides a way to stop propagating an event.
OfficeUIRibbon.directive('ngcTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind("mouseenter", function (e) {
                var tooltipElement = element.next();

                var tooltipTimeout = setTimeout(function() {
                    tooltipElement.show();
                }, 1000);

                element.bind("mouseleave", function (e) {
                    clearTimeout(tooltipTimeout);
                    tooltipElement.hide();
                });
            });
        }
    };
});