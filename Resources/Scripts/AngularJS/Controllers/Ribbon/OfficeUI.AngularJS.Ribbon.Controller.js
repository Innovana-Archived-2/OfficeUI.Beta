/* Loads the AngularJS module 'OfficeRibbon'.
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', '$animate', function($scope, $http, $animate) {
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
    
    // Area: Functions defined below are used for the application tab.
    
        // Marks an application menu as the active one.
        $scope.setApplicationMenuItemAsActive = function(applicationMenuItem) {
            ribbon.setApplicationMenuItemAsActive(applicationMenuItem);
        }
        
        // Marks an application menu item as the active one.
        // There's a check happening here so that only menuitems that doesn't are a seperator are able to being marked as active.
        ribbon.setApplicationMenuItemAsActive = function(applicationMenuItem) {
            if (applicationMenuItem.Seperator != 'True') {
                ribbon.activeApplicationMenuItem = applicationMenuItem;
            }
        }
        
        // Checks is a given application menu is being active.
        ribbon.isApplicationMenuActive = function(applicationMenuItem) {
            return ribbon.activeApplicationMenuItem == applicationMenuItem;
        }

        // Sets the application menu as being active, which means that it should be showed.
        ribbon.setApplicationMenuAsOpened = function() {
            ribbon.applicationMenuActive = true;
        }

        // Sets the application menu as being inactive, which means that it should be showed.
        ribbon.setApplicationMenuAsClosed = function() {
            ribbon.applicationMenuActive = false;
        }

        // Check if the application menu is active.
        ribbon.isApplicationMenuOpened = function() {
            return ribbon.applicationMenuActive;
        }

    // End Of Area: End of the functions which are being used for the application tab.
    
    // Get the Json file defined on the directive that points to the correct location of the JSon file.
    $http.get("/OfficeUI.Beta/Resources/JSon/Ribbon/ribbon.json")
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
            
            // Retrieve the first application menu entry and set this as the active one.
            var firstApplicationMenuEntryID = ribbon.Tabs[0].MenuItems[0];
            $scope.setApplicationMenuItemAsActive(firstApplicationMenuEntryID);
            
            // Loop until we have the actions.
            $.each(ribbon.Tabs, function(tabIndex, tab) {
                // Only loop over the groups if there are any.
                if (tab.Groups) {
                    $.each(tab.Groups, function(groupIndex, group) {
                        
                        // Only loop over the areas if there are any.
                        if (group.Areas) {
                            $.each(group.Areas, function(areaIndex, area) {
                                
                                // Only loop over the actions if there are any.
                                if (area.Actions) {
                                    $.each(area.Actions, function(actionIndex, action) {
                                        
                                        // Set a property 'hasTooltip' when the a tooltip is available for this action.
                                        if (action.Tooltip) { action.hasTooltip = true; }
                                        else { action.hasTooltip = false; }
                                        
                                        action.setTooltip = function() {
                                            action.Tooltip = "Dit is een test om na te gaan of de tooltip aangepast kan worden.";
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        
            // Sets the second tab as the active one. The second one is the tab next to the application tab.
            ribbon.activeTab = data.Tabs[1].Id;

            // Set the application menu as not active, this will always be the default behaviour on page load.
            ribbon.applicationMenuActive = false;
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
            ribbon.state = ribbonStates.Visible;
        }
    }
    
    // Checks if the ribbon is hidden.
    ribbon.isHidden = function() {
        return ribbon.state == ribbonStates.Hidden;
    }
    
    // Checks if the ribbon is visible.
    ribbon.isVisible = function() {
        return ribbon.state == ribbonStates.Visible;
    }
    
    // Checks if the ribbon is showed.
    ribbon.isShowed = function() {
        return ribbon.state == ribbonStates.Showed;
    }

    // Hide the ribbon.
    ribbon.toggleRibbonState = function() {
        if (ribbon.state == ribbonStates.Showed) {
            ribbon.state = ribbonStates.Hidden;
        } else if (ribbon.state == ribbonStates.Visible) {
            ribbon.state = ribbonStates.Showed;
        }
    }

    // Sets the currently active tab based on it's id.
    $scope.setActiveTab = function(tabId) {
        ribbon.setActiveTab(tabId);

        $scope.$apply();
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

    // Defines the function which is executed when we scroll on the ribbon.
    // Remark: This function is only executed when the element is marked with the 'ngc-scroll' attribute.
    $scope.ribbonScroll = function(scrollEvent) {
        // Based on scrolling up or down, some other events needs to be executed.
        // In the code below, we're checking two properties of the scroll event, this is done because firefox, chrome and internet explorer uses another way
        // of handling scroll events. By using the code below, we're sure that the scrolling is enabled for all the browsers, and that the direction doesn't mind.
        if (scrollEvent.originalEvent.detail > 0 || scrollEvent.originalEvent.wheelDelta < 0) {
            // Get the next available ribbon tab and set it as being active.
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            // Get the previous available ribbon tab and set is as being active.
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').prev().attr('id'));
            }
        }

        $scope.$apply();
    }

    // General events - not specifically tied to the controller.
    // Executed when you click somewhere on the page.
    $(window).on('click', function(e) {
        console.log('Clicked the window.');
        // Check if the state of the ribbon is 'Overlay'.
        if (ribbon.state == ribbonStates.Visible) {
            $scope.setRibbonHidden();
        }
    });

    $('#ribbonContents').on('click', function(e) {
        e.stopPropagation();
    });
}]);