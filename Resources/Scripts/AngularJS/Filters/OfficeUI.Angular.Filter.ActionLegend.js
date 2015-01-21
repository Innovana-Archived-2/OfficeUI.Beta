var OfficeUIRibbon = angular.module('OfficeUIRibbon');

OfficeUIRibbon.filter('actionLegend', function() {
    return function(input) {
        if (input.MenuItems) {
            return input.Legend + ' <i class="fa fa-caret-down"></i>';
        }
        return input.Legend;
    }
});