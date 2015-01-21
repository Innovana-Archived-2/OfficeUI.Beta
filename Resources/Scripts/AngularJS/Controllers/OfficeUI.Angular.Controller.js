var OfficeUI = angular.module('OfficeUI');

OfficeUI.controller('OfficeUI', ['$http', function($http) {
    var application = this;

    $http.get('/OfficeUI.Beta/Resources/data/application.json')
        .success(function(data) {
            application.Title = data.Title;
            application.Icons = data.Icons;
        })
        .error(function(data) {
            console.error('An error occured while loading the \'application.json\' file. ');
        });
}]);