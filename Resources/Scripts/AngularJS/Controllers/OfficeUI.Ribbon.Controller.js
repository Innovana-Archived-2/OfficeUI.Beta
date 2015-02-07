/* Loads the module 'OfficeUIRibbon'. */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/**
 * @ngdoc Controller
 * @name OfficeUIRibbon
 *
 * @description
 * The 'OfficeUIRibbon' controller allows us to set-up the core functions for an OfficeUI application.
 *
 * @dependencies
 * $http
 *
 * @element ANY
 *
 * @example
 *  <example module="OfficeUIRibbonExample">
 *    <file name="index.html">
 *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon"></body>
 *    </file>
 *  </example>
 */
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', 'OfficeUIRibbonService', function($scope, $http, OfficeUIRibbonService) {
    /**
     * @ngdoc Initialization.
     *
     * @description
     * This property is set on the scope first because otherwise, AngularJS will cause some JavaScript issues.
     * This is due to the fact that we're loading data from a Json file, but on the startup of the application, not all the data has been retrieved yet.
     * Therefore we set some of the properties which relies on the application.
     */
    $scope.OfficeUIRibbon.ribbonStates = {};
    $scope.OfficeUIRibbon.initialized = false;

    $scope.isRibbonInitialized = function() {
        return $scope.OfficeUIRibbon.initialized;
    }

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
     *
     * @example
     * <example module="OfficeUIRibbonInitializationExample" deps="OfficeUI.min.js">
     *   <file name="index.html">
     *     <body ng-controller="OfficeUIRibbon as OfficeUIRibbon"></body>
     *   </file>
     * </example>
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
     * @ngdoc Area
     * @name Public API
     *
     * @description
     * All the methods which can be found below does belong to an exposed API by all aspects of the OfficeUI application.
     *
     */

    /**
     * @description
     * Set a specific tab as being active.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.setActiveTabOnScrolling = function(tabId) {
        if ($.fn.OfficeUI.Defaults.changeActiveTabOnHover) { OfficeUIRibbonService.setActiveTab(tabId); }
    }

    /**
     * @ndgoc Function
     * @name isRibbonShowed
     *
     * @description
     * Check if the current state of the ribbon is 'Showed'.
     *
     * @returns {boolean} True if the ribbon's state is set to 'Showed', false otherwise.
     */
    $scope.isRibbonShowed = function() {
        return $scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Showed;
    }

    /**
     * @ndgoc Function
     * @name isRibbonVisible
     *
     * @description
     * Check if the current state of the ribbon is 'Visible'.
     *
     * @returns {boolean} True if the ribbon's state is set to 'Visible', false otherwise.
     */
    $scope.isRibbonVisible = function() {
        return $scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Visible;
    }

    /**
     * @ndgoc Function
     * @name isRibbonHidden
     *
     * @description
     * Check if the current state of the ribbon is 'Hidden'.
     *
     * @returns {boolean} True if the ribbon's state is set to 'Hidden', false otherwise.
     */
    $scope.isRibbonHidden = function() {
        return $scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Hidden;
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

    $scope.isApplicationMenuItemActive = function(applicationMenuItem) {
        return $scope.activeApplicationMenuItem == applicationMenuItem;
    }

    $scope.setApplicationMenuItemAsActive = function(applicationMenuItem) {
        if (applicationMenuItem.Seperator != 'True') {
            $scope.activeApplicationMenuItem = applicationMenuItem;
        }
    }

    /**
     * @ngdoc Method
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
        if ($scope.OfficeUIRibbon.state == $scope.OfficeUIRibbon.ribbonStates.Visible) {
            $scope.OfficeUIRibbon.initialized = true;
            $scope.OfficeUIRibbon.state = $scope.OfficeUIRibbon.ribbonStates.Hidden;

            $scope.$apply();
        }
    });
}]);