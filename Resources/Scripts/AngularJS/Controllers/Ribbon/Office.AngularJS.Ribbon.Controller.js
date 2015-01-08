/* Loads the AngularJS module 'OfficeRibbon'.
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', function($scope, $http) {
    // Defines the various variables needed for this controller.
    var ribbon = this;
    
    
}]);