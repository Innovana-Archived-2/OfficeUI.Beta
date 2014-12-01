/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$http', function($http) {
    this.data = "demo";
    // Defines required variables.
    var ribbon = this;
    
    // Get the Json file 'application.json' that defines the application data.
    $http.get('/Resources/JSon/Ribbon/ribbon.json')
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
        })
        .error(function(data) {
            console.log('An error occured while loading the \'ribbon.json\' file.');
        });
}]);