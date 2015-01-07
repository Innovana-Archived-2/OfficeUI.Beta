/* Loads the AngularJS module 'OfficeUI'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI'.
*/
var OfficeUI = angular.module('OfficeUI');

// Defines the OfficeUI controller for the application.
OfficeUI.controller('OfficeUI', ['$scope', '$http', function($scope, $http) {
    // Defines required variables.
    var application = this;
    
    // Get the Json file 'application.json' that defines the application data.
    $http.get('/OfficeUI.Beta/Resources/JSon/application.json')
        .success(function(data) {
            application.Title = data.Title;
            application.Icons = data.Icons;
        })
        .error(function(data) {
            console.error('An error occured while loading the \'application.json\' file.');
        });
}]);