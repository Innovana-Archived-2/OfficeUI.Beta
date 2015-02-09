// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Directive
 * @name applicationMenuContents
 *
 * @description
 * Provides a way to render the contents of an application menu item.
 * There's a parameter that can be added to this directive, called 'url'.
 * This parameter points to an url location that defines the content behind the application tab.
 *
 * @element Elements
 */
OfficeUIRibbon.directive('applicationMenuContents', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            url: '@'
        },
        link: function(scope, element, attributes) {
            scope.$watch('url', function(value) {
                scope.contentUrl = value;
            });
        },
        template: function() {
            return '<div ng-include="contentUrl"></div>';
        }
    }
});