// Loads up the module 'OfficeUI'.
var OfficeUIRibbon = angular.module('OfficeUI');

/**
 * @ngdoc Directive
 * @name responsive
 *
 * @description
 * The 'responsive' directive allows an element to be responsive according to calculations being done.
 *
 * @element Attribute.
 */
OfficeUIRibbon.directive('responsive', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            // When the window is resized, make sure that all the elements are being resized, thus making sure that the website is responsive.
            $(window).on('resize', function(e) {

                // Resizing the OfficeUI application icons.
                var applicationIconsDefaultWidth = 89;
                var applicationTitleMinimumWidth = 400;

                var applicationIcons = $('.application-icons-holder');
                var applicationTitle = $('.title .legend');

                if ($(applicationTitle).width() < 400 && $(applicationIcons).width() == 89) {
                    $(applicationIcons).width(59);
                }

                if ($(applicationTitle).width() > 400 && $(applicationIcons).width() == 59) {
                    $(applicationIcons).width(89);
                }

                if ($(applicationTitle).width() < 370 && $(applicationIcons).width() == 59) {
                    $(applicationIcons).width(29);
                }

                if ($(applicationTitle).width() > 370 && $(applicationIcons).width() == 29) {
                    $(applicationIcons).width(59);
                }
            });

        }
    };
});