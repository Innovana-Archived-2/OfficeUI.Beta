// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name ngcTooltip
 *
 * @description
 * The ngcTooltip directive allows you to show tooltip elements.
 *
 * @element ANY
 */
OfficeUIRibbon.directive('ngcTooltip', function () {
    return {
        restrict: 'A',
        scope: { method: '&ngcTooltip' },
        link: function (scope, element, attributes) {
            element.bind("mouseenter", function (e) {
                if (!element.hasClass('disabled')) {
                    var tooltipElement = $('.tooltip', element.parent());

                    $.fn.OfficeUI.waitHandleShowTooltip = setTimeout(function () {
                        $(tooltipElement).show();
                    }, 1000);

                    element.bind("mouseleave", function (e) {
                        clearTimeout($.fn.OfficeUI.waitHandleShowTooltip);

                        $.fn.OfficeUI.waitHandleHideTooltip = setTimeout(function () {
                            $(tooltipElement).hide();
                        }, 500);
                    });
                }
            });
        }
    };
});