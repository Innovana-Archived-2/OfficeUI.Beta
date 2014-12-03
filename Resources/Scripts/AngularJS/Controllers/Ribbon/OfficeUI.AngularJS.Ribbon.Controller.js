/* OfficeUI Ribbon AngularJS module.
 *  
 *  The OfficeUI Ribbon module is a way to recreate the Office Ribbon in plain HTML.
 *  An an input source, the module is based on the visual representation of the Office Ribbon in Microsoft Outlook 2013.
 *
 *  The following information is important for this module.
 *  
 *      - ribbonState:      Defines the state of the ribbon and can contain the following values:
 *                              1: Normal (Ribbon is showed).
 *                              2: Collapsed (Ribbon is hidden).
 *                              3: Overlay (Ribbon is collapsed but is showed just now).
 */

// Contents area.
var collapsedCookieName = 'OfficeUIRibbon.Collapsed';

/* Loads the AngularJS module 'OfficeUI.Ribbon'.
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', function($scope, $http) {
    // Defines the various variables needed for this controller.
    var ribbon = this;

    // Initialize the AngularJS module.
    $scope.Initialize = function(scope, contentSelector, tabsSelector) {
        Ribbon.Initialize($scope, ribbon, contentSelector, tabsSelector); // Initialize the ribbon.
    }

    // Refresh the view so that it's updated with the correct data.
    $scope.refresh = function() {
        $scope.$apply();
    }

    // Defines the function which is executed when we scroll on the ribbon.
    // Remark: This function is only executed when the element is marked with the 'ngc-scroll' attribute.
    $scope.ribbonScroll = function(scrollEvent) {
        // Based on scrolling up or down, some other events needs to be executed.
        if (scrollEvent.originalEvent.detail > 0 || scrollEvent.originalEvent.wheelDelta > 0) {
            // Get the next available ribbon tab and set it as being active.
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            // Get the previous available ribbon tab and set is as being active.
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').prev().attr('id'));
            }
        }
    }

    // Gets the current state of the ribbon which should be 1, 2 or 3.
    $scope.ribbonState = function() {
        return ribbon.state;
    }

    // Update the state of the ribbon.
    // Parameters:
    //      state:      The new state of the ribbon.
    $scope.setRibbonState = function(state) {
        ribbon.state = state;

        $scope.refresh(); // Update the view.
    }

    // Collapse the ribbon.
    // Parameters:
    //      State:      The state that defines the animation to execute. Should be either 'show' or 'hide'.
    $scope.collapseRibbon = function(state) {
        // Perform validation to the parameter values.
        if (state != 'hide' && state != 'show') {
            console.error('Only \'hide\' and \'show\' are valid parameters for the \'collapseRibbon\' function.');
            // Store the state of the ribbon in cookie.
        } else if (state == 'show') {

        }

        $scope.refresh(); // Update the view since we've collapsed the ribbon for the moment.
    }

    // Get the Json file 'ribbon.json' that defines the ribbon data.
    $http.get($scope.template)
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
            
            // Sets the second tab as the active one. The second one is the tab next to the application tab.
            ribbon.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) {
            console.error('An error occured while loading the \'ribbon.json\' file.');
        });
    
    // Sets the currently active tab based on it's id.
    this.setTab = function(tabId) {
        ribbon.activeTab = tabId;
        
        // First, we need to check if the ribbon is hidden or not, based on that, we might need to animate the element to
        // show the ribbon again.
        if (ribbon.state == 2) {
            var ribbonContents = $('ul[role=tabContents]');
            
            ribbonContents.curtain({ direction: 'down', height: 92 });
            
            ribbon.state = 3;
        }
    }

    // Check if a given tab is active based on it's id.
    this.isActive = function(tabId) {
        return this.activeTab == tabId;
    }
}]);