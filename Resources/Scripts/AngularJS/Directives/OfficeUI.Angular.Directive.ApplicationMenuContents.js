var OfficeUIRibbon = angular.module('OfficeUIRibbon');

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