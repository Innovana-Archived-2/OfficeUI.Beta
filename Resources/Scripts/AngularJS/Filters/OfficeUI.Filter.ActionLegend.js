// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Filter
 * @name actionLegend
 *
 * @description
 * Provides a way to render the legend of an action on the OfficeUI Ribbon.
 * This is being done through a filter, because, when the action does hold menu items,
 * then the legend is printed and next to it and icon with an arrow pointing down.
 * This is done to indicate that there are items beneath it.
 */
OfficeUIRibbon.filter('actionLegend', function() {
    return function(action) {
        if (action.MenuItems) {
            return action.Legend + ' <i class="fa fa-caret-down"></i>';
        }
        return action.Legend;
    }
});