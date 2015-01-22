// Loads the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUI');

// Defines the AngularJS 'OfficeUI' controller.
OfficeUI.controller('OfficeUI', ['$http', function($http) {
    var application = this;

    // Loads the application data.
    $http.get($.fn.OfficeUI.applicationDataFile)
        .success(function(data) {
            application.Title = data.Title;
            application.Icons = data.Icons;
        })
        .error(function(data) {
            console.error('An error occured while loading the \'application.json\' file. ');
        });
}]);