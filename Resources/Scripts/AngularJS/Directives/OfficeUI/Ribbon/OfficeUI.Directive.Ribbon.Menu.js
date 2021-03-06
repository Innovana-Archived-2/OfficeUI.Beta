// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name ngcMenu
 *
 * @description
 * The ngcMenu directive allows you to show a menu entry on the ribbon.
 *
 * @element ANY
 */
OfficeUIRibbon.directive('ngcMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind("click", function(e) {
                // Hide every open 'menu' element. This is needed because otherwise the animations will not function anymore.
                $('.menu').each(function(index, item) {
                    $(item).hide();
                });
                var menuElement = $('.menu', element.parent());
                if (scope.isMenuOpened()) { $(menuElement).show('slide', { direction: 'up' }, 100); }
                else { $(menuElement).hide(); }
            });
        }
    };
});