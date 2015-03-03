// Loads up the module 'OfficeUIRibbon'.
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Controller
 * @name OfficeUIRibbon
 *
 * @description
 * The 'OfficeUIRibbon' controller allows us to set-up the core functions for an OfficeUI application.
 *
 * @dependencies $scope, $http, OfficeUIRibbonService.
 *               The $http dependency is required for loading up the json (ribbon) file dynamically.
 *
 * @element ANY
 */
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', 'OfficeUIRibbonService', function($scope, $http, OfficeUIRibbonService) {
    /**
     * @ngdoc Function
     * @name Initialization
     *
     * @description
     * Performs some required initialization needed for the controller to load up correctly.
     *
     * @remarks
     * This function will load up the necessary data from a given file set in a JavaScript variable '$.fn.OfficeUI.ribbonDataFile'.
     * For this reason, this variable needs to be set in a JavaScript call on the HTML page itself.
     * The data which is retrieved from this file is stored in a variable called 'data' under the 'scope'.
     * The first tab will be set as the active one.
     */
    $http.get($.fn.OfficeUI.ribbonDataFile)
        .success(function(data) {
            OfficeUIRibbonService.setServiceInstance(data);
            $scope.OfficeUIRibbon = OfficeUIRibbonService.getServiceInstance();

            // Get the first menu entry in the application menu, and make sure that that element is set as the active one.
            var firstApplicationMenuEntryID = data.Tabs[0].MenuItems[0];
            $scope.setApplicationMenuItemAsActive(firstApplicationMenuEntryID);
        })
        .error(function(data) { console.error('An error occured while loading the file \'' + $.fn.OfficeUI.ribbonDataFile + '\' file. '); })

    /**
     * @description
     * Set a tab as being active when scrolling is enabled.
     *
     * @param tabId     The id of the tab to activate.
     */
    $scope.setActiveTabOnScrolling = function(tabId) {
        if ($.fn.OfficeUI.Defaults.changeActiveTabOnHover) { OfficeUIRibbonService.setActiveTab(tabId); }
    }

    /**
     * @ngdoc Function
     * @name toggleRibbonState
     *
     * @description
     * Toggle the state of the ribbon.
     * If the state of the ribbon is set to 'Showed', then the state will change to 'Hidden'.
     * If the state of the ribbon is set to 'Visible', then the state will change to 'Showed'.
     */
    $scope.toggleRibbonState = function() {
        if ($scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Showed) { $scope.OfficeUIRibbon.state = $scope.OfficeUIRibbon.ribbonStates.Hidden; }
        else if ($scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Visible) { $scope.OfficeUIRibbon.state = $scope.OfficeUIRibbon.ribbonStates.Showed; }
    }

    /**
     * @ngdoc Function
     * @name contextualGroupHasAnActiveTab
     *
     * @description
     * Check if a given contextual group has any tab which has been set as active.
     *
     * @param contextualGroup
     *        The contextual group that should be checked for an active tab.
     *
     * @returns {boolean} True if any active tab has been found, false otherwise.
     */
    $scope.contextualGroupHasAnActiveTab = function(contextualGroup) {
        if ($scope.OfficeUIRibbon.activeContextualGroups.length == 0) { return false; }
        else {
            var activeTab = $.grep(contextualGroup.Tabs, function(tab) {
                return tab.Id == $scope.OfficeUIRibbon.activeTab;
            });

            return activeTab.length > 0;
        }
    }

    /**
     * @ngdoc Function
     * @name ribbonScroll
     *
     * @description
     * This method is executed automatically through a directive.
     * This method is called when you scroll on the ribbon.
     * The purpose of this method is to select the next or previous available tab, according to the scroll direction.
     *
     * @param scrollEvent
     *        The event that defines the scrolling. Based on this event we can calculate if we're scrolling up or down.
     */
    $scope.ribbonScroll = function(scrollEvent) {
        var tabToActivate = null;

        if (scrollEvent.detail > 0 || scrollEvent.wheelDelta < 0) {
            var activeTab = $('.ribbon .active');

            if (activeTab.next().attr('id') != null) { tabToActivate = activeTab.next(); }
            else {
                if (activeTab.parents('.context-group').length == 0) {
                    if ($('.active-contextual-group').length > 0) { tabToActivate = $('.tab', '.active-contextual-group'); }
                }
                else {
                    if (activeTab.parents('.active-contextual-group').next('.active-contextual-group').length > 0) {
                        tabToActivate = $('.tab', activeTab.parents('.active-contextual-group').next('.active-contextual-group'));
                    }
                }
            }
        } else {
            var activeTab = $('.ribbon .active');

            if (activeTab.prev().attr('id') != null && !activeTab.prev().hasClass('application')) { tabToActivate = activeTab.prev(); }
            else {
                if (!activeTab.prev().hasClass('application')) {
                    if (activeTab.parents('.context-group').length == 0) {
                        if ($('.active-contextual-group').length > 0) { tabToActivate = $('.tab', '.active-contextual-group'); }
                    }
                    else {
                        if (activeTab.parents('.active-contextual-group').prev('.active-contextual-group').length > 0) {
                            tabToActivate = $('.tab', activeTab.parents('.active-contextual-group').prev('.active-contextual-group')).last();
                        } else {
                            tabToActivate = $('.ribbon .tab-normal').last();
                        }
                    }
                }

            }
        }

        if (tabToActivate != null) { $scope.setActiveTab(tabToActivate.attr('id')); }

        $scope.$apply();
    }

    /**
     * @ngdoc Function
     * @name isApplicationMenuItemActive
     *
     * @description
     * Check's is an application menu item is being set as active.
     *
     * @param applicationMenuItem   The application menu item to check for being active.
     *
     * @returns {boolean} True if the application menu item has been set as active, false otherwise.
     */
    $scope.isApplicationMenuItemActive = function(applicationMenuItem) {
        return $scope.activeApplicationMenuItem == applicationMenuItem;
    }

    /**
     * @ngdoc Function
     * @name setApplicationMenuItemAsActive
     *
     * @description
     * Set an application menu item as active.
     *
     * @param applicationMenuItem   The application menu item to set active.
     */
    $scope.setApplicationMenuItemAsActive = function(applicationMenuItem) {
        if (applicationMenuItem.Seperator != 'True') {
            $scope.activeApplicationMenuItem = applicationMenuItem;
        }
    }

    /**
     * @ngdoc Function
     * @name isMenuActive
     *
     * @description
     * Check if a menu is active. This can be checked by looking at the action.
     * If the id of the action matched the 'activeMenu' parameter defined in the service, than the menu is active, false otherwise.
     *
     * @param action        The id of the action for which we want to check if the menu is active.
     * @returns {boolean}   True if the menu is active, false otherwise.
     */
    $scope.isMenuActive = function(action) {
        if ($scope.OfficeUIRibbon.activeMenu == action) { return true; }
        return false;
    }

    /**
     * @ngdoc Function
     * @name isMenuOpened
     *
     * @description
     * Checks if any menu item is being opened.
     *
     * @returns {boolean}   True if any menu is active, false otherwise.
     */
    $scope.isMenuOpened = function() {
        return $scope.OfficeUIRibbon.activeMenu != null;
    }

    /**
     * @ngdoc function
     * @name defaultActionClick
     *
     * @description
     * This function is the default action which is executed when you click on an action.
     *
     * @param action        The action for which this method is being called.
     */
    $scope.defaultActionClick = function(action) {
        // Make sure that the tooltip doesn't show anymore when you've clicked on an item.
        clearTimeout($.fn.OfficeUI.waitHandleShowTooltip);

        if (action.MenuItems) {
            if ($scope.OfficeUIRibbon.activeMenu == action.Id) { $scope.OfficeUIRibbon.activeMenu = null; }
            else { $scope.OfficeUIRibbon.activeMenu = action.Id; }
        } else { $scope.OfficeUIRibbon.activeMenu = null; }
    }

    /**
     * @ngdoc Function
     *
     * @description
     * This method is executed when you click anywhere on the browser window.
     *
     * @remarks
     * This method will hide the ribbon when it's state is set on 'Visible'.
     * In order to avoid the execution of this function when you click on an element, mark that
     * element with the 'stop-propagation' directive.
     */
    $(window).on('click', function(e) {
        $scope.OfficeUIRibbon.activeMenu = null;

        if (OfficeUIRibbonService.isRibbonVisible()) {
            OfficeUIRibbonService.setRibbonInitialized();
            $scope.OfficeUIRibbon.state = $scope.OfficeUIRibbon.ribbonStates.Hidden;
        }

        $scope.$apply();
    });
}]);