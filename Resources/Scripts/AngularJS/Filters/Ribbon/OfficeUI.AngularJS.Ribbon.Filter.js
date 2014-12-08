/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');


OfficeUIRibbon.filter('actionLegend', function() { 
    return function(input) {
        if (input.HoldMenu == "True") {
            return input.Legend + ' <i class="fa fa-caret-down"></i>';
        }
        return input.Legend;
    }
});