/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', function($scope, $http) {
    // Defines required variables.
    var ribbon = this;
    
    ribbon.hidden = false;
    
    // Get the Json file 'application.json' that defines the application data.
    $http.get('/Resources/JSon/Ribbon/ribbon.json')
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
            
            // Sets the second tab as the active one. The second one is the tab next to the application tab.
            ribbon.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) {
            console.log('An error occured while loading the \'ribbon.json\' file.');
        });
    
    // Sets the currently active tab based on it's id.
    this.setTab = function(tabId) {
        this.activeTab = tabId;
    }
    
    // Check if a given tab is active based on it's id.
    this.isActive = function(tabId) {
        return this.activeTab == tabId;
    }
    
    $scope.changeTab = function(scrollEvent) {
        // If we scroll up or down another event should be executed.
        if (scrollEvent.originalEvent.detail > 0 || scrollEvent.originalEvent.wheelDelta > 0) {
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').prev().attr('id'));
            }
        }
        
        $scope.$apply(); // Update the view.
    }
    
    // Hide the ribbon.
    $scope.hide = function() {
        ribbon.hidden = true;
        
        $scope.$apply(); // Update the view.
    }
}]);