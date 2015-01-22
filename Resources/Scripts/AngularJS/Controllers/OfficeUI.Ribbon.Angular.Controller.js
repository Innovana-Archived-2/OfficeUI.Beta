// Loads the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the AngularJS 'OfficeUIRibbon' controller.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', '$animate', function($scope, $http, $animate) {
    var ribbon = this;

    // Defines the various states that a ribbon can have.
    var ribbonStates = {
        Hidden: 1,      // The ribbon is not showed, in other words, it's collapsed.
        Visible: 2,     // The ribbon is visible, but will not be visible anymore after a click somewhere on the screen.
        Showed: 3       // The ribbon is showed and stays showed no matter where you click on the page.
    }

    // Set the state of the ribbon to 'ribbonStates.Showed'.
    // This means that the ribbon is showed and stays showed.
    ribbon.state = ribbonStates.Showed;

    // Loads the ribbon data file.
    $http.get($.fn.OfficeUI.ribbonDataFile)
        .success(function(data) {
            ribbon.Tabs = data.Tabs;

            // Get the first menu entry in the application menu, and make sure that that element is set as the active one.
            var firstApplicationMenuEntryID = ribbon.Tabs[0].MenuItems[0];
            $scope.setApplicationMenuItemAsActive(firstApplicationMenuEntryID);

            // Set the first tab as the active one.
            ribbon.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) {
            console.error('An error occured while loading the data file.');
        });

    // Area: Application Menu functions.

        // Sets the application menu as active.
        // Note:    In this function, there's a check to see if the item is a separator.
        //          If that item is a separator, don't do anything, otherwise, mark the item as being active.
        // Parameters:
        //      applicationMenuItem:        The applicationMenuItem to mark as active.
        $scope.setApplicationMenuItemAsActive = function(applicationMenuItem) {
            if (applicationMenuItem.Seperator != 'True') {
                ribbon.activeApplicationMenuItem = applicationMenuItem;
            }
        }

        // Toggle the application menu.
        // This means that when the application menu is showed, it will being made hidden.
        // If the application menu is hidden, it will being made active.
        ribbon.toggleApplicationMenu = function() {
            if (!ribbon.applicationMenuActive) { ribbon.applicationMenuActive = true; }
            else { ribbon.applicationMenuActive = false; }
        }

        // If the application menu is active this function will return true, otherwise this function will return false.
        // Parameters:
        //      applicationMenuItem:        The applicationMenuItem to check for being active.
        ribbon.isApplicationMenuItemActive = function(applicationMenuItem) {
            return ribbon.activeApplicationMenuItem == applicationMenuItem;
        }

        // If the application menu is opened, then this function will return true, otherwise this function will return false.
        ribbon.isApplicationMenuOpened = function() {
            return ribbon.applicationMenuActive;
        }

    // End Of Area: Application Menu Functions.

    // Area: Ribbon (Normal tabs) functions.

        // Checks if a tab is being active, based on the id of the tab.
        // Parameters:
        //      tabId:      The id of the tab which to check for being active.
        ribbon.isTabActive = function(tabId) {
            return this.activeTab == tabId;
        }

        // Sets a tab as being active, based on the id of the tab.
        // Parameters:
        //      tabId:      The id of the tab which to make active.
        //      isHover:    A parameters that defines if we're hovering on the tab element or not.
        //                  True:       We are hovering.
        //                  False:      We are not hovering.
        ribbon.setActiveTab = function(tabId, isHover) {
            // When you click on tab (when it's not hovering) set the active tab directly.
            // When you hover on a tab element, we check if the configuration does allows us to change the currently active tab by hovering on it.
            // If that's the case, set the active tab element.
            if (!isHover) {
                // Make sure that the ribbon does become visible whenever you activate tab.
                if (ribbon.state == ribbonStates.Hidden) { ribbon.state = ribbonStates.Visible; }

                ribbon.activeTab = tabId;
            } else {
                if ($.fn.OfficeUI.Defaults.changeActiveTabOnHover) {
                    // Make sure that the ribbon does become visible whenever you activate tab.
                    if (ribbon.state == ribbonStates.Hidden) { ribbon.state = ribbonStates.Visible; }

                    ribbon.activeTab = tabId;
                }
            }
        }

    // End Of Area: Ribbon (Normal tabs) functions.

    // Area: Ribbon state functions.

        // Set the ribbon as hidden.
        ribbon.isHidden = function() {
            return ribbon.state == ribbonStates.Hidden;
        }

        // Set the ribbon as visible.
        ribbon.isVisible = function() {
            return ribbon.state == ribbonStates.Visible;
        }

        // Set the ribbon as showed.
        ribbon.isShowed = function() {
            return ribbon.state == ribbonStates.Showed;
        }

        // Toggle the state of the ribbon.
        // If the ribbon is showed, than it's state is set to hidden.
        // If the ribbon is visible, than it's state is set to showed.
        ribbon.toggleRibbonState = function() {
            if (ribbon.state == ribbonStates.Showed) {
                ribbon.state = ribbonStates.Hidden;
            } else if (ribbon.state == ribbonStates.Visible) {
                ribbon.state = ribbonStates.Showed;
            }
        }

        // Set the ribbon as hidden.
        $scope.setRibbonHidden = function() {
            ribbon.state = ribbonStates.Hidden;

            $scope.$apply();
        }

        // Set the ribbon as showed.
        $scope.setRibbonShowed = function() {
            ribbon.state = ribbonStates.Showed;

            $scope.$apply();
        }

    // End Of Area: Ribbon state functions.

    $scope.ribbonScroll = function(scrollEvent) {
        if (scrollEvent.detail > 0 || scrollEvent.wheelDelta < 0) {
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').prev().attr('id'));
            }
        }

        $scope.$apply();
    }

    // Area: General functions.

        // When you click somewhere on the page, and the ribbon is visible, make sure that the ribbon is hidden.
        $(window).on('click', function(e) {
            if (ribbon.state == ribbonStates.Visible) {
                $scope.setRibbonHidden();
            }
        });

        // When you click on the contents of the ribbon, stop propagating the events.
        // This is to make sure that the ribbon is not hidden when clicking on an icon (see the method above).
        $('#ribbonContents').on('click', function(e) {
            e.stopPropagation();
        });

    // End Of Area: General functions.
}]);