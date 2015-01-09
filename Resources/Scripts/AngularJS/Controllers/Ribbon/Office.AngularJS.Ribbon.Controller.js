/* Loads the AngularJS module 'OfficeRibbon'.
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeRibbon', ['$scope', '$http', function($scope, $http) {
    // Defines the various states that a ribbon can have.
    //      Hidden:     The ribbon is hidden completely.
    //      Visible:    The ribbon is visible, but not showed, which means it will be collapsed again when needed.
    //      Showed:     The ribbon is showed and takes up the necessary space.
    var ribbonStates = {
        Hidden: 1,
        Visible: 2,
        Showed: 3
    }
        
    // Defines the various variables needed for this controller.
    var ribbon = this;
    
    ribbon.state = ribbonStates.Showed; // Set the default state for the ribbon, the state when the ribbon is loaded.
    
    // Get the Json file defined on the directive that points to the correct location of the JSon file.
    $http.get($scope.data)
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
        
            // Sets the second tab as the active one. The second one is the tab next to the application tab.
            ribbon.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) {
            console.error('An error occured while loading the data file.');
        });
    
    // Check if a given tab is active based on it's id.
    ribbon.isActive = function(tabId) {
        return this.activeTab == tabId;
    }
    
    // Sets the currently active tab based on it's id.
    ribbon.setActiveTab = function(tabId) {
        ribbon.activeTab = tabId;
        
        // Check if the ribbon is hidden or not.
        if (ribbon.state == ribbonStates.Hidden) {
            var ribbonContents = $('#ribbonContents');
            
            ribbon.state = ribbonStates.Visible;
            
            // Lower the curtain.
            ribbonContents.curtain({ direction: 'down', height: 92 });
        }
    }
    
    // Checks if the ribbon is hidden.
    ribbon.isHidden = function() {
        return ribbon.state === ribbonStates.Hidden;
    }
    
    // Checks if the ribbon is visible.
    ribbon.isVisible = function() {
        return ribbon.state === ribbonStates.Visible;
    }
    
    // Checks if the ribbon is showed.
    ribbon.isShowed = function() {
        return ribbon.state === ribbonStates.Showed;
    }
    
    // Sets the ribbon as hidden.
    $scope.setRibbonHidden = function() {
        ribbon.state = ribbonStates.Hidden;
        
        $scope.$apply(); // Apply this to the view.
    }
    
    // Sets the ribbon as visible.
    $scope.setRibbonVisisble = function() {
        ribbon.state = ribbonStates.Visible;
        
        $scope.$apply(); // Apply this to the view.
    }
    
    // Sets the ribbon as showed.
    $scope.setRibbonShowed = function() {
        ribbon.state = ribbonStates.Showed;
        
        $scope.$apply(); // Apply this to the view.
    }
    
    // Checks if the ribbon is hidden.
    $scope.isHidden = function() {
        return ribbon.isHidden();
    }
    
    // Checks if the ribbon is visible.
    $scope.isVisible = function() {
        return ribbon.isVisible();
    }
    
    // Checks if the ribbon is showed.
    $scope.isShowed = function() {
        return ribbon.isShowed();
    }
}]);