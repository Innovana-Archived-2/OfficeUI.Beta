// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name ngcMenu
 *
 * @description
 * The ngcMenu directive allows you to add a menu.
 *
 * @element ANY
 */
OfficeUIRibbon.directive('ngcMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind("click", function (e) {
                if (!element.hasClass('disabled')) {

                    //var menuElement = $('.menucontents', element.parent());

                    //if ($(menuElement).css('display') == 'none') {
                        //element.children().children().addClass('active');
                        //$(menuElement).show();
                    //} else {
                    //    element.children().children().removeClass('active');
                    //    $(menuElement).hide();
                    //}
                    //var actionElement = scope.$eval(attributes["ngcTooltip"]);

                    // Only show the tooltip when the menuitem is not visible.
                    //if (!scope.isMenuActive(actionElement.action)) {
                    //    $.fn.OfficeUI.waitHandleShowTooltip = setTimeout(function () {
                    //        $(tooltipElement).show();
                    //    }, 1000);

                    //    element.bind("mouseleave", function (e) {
                    //        clearTimeout($.fn.OfficeUI.waitHandleShowTooltip);

                    //        $.fn.OfficeUI.waitHandleHideTooltip = setTimeout(function () {
                    //            $(tooltipElement).hide();
                    //        }, 500);
                    //    });
                    //}
                }
            });
        }
    };
});