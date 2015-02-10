// Loads up the module 'OfficeUI'.
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Controller
 * @name OfficeUI
 *
 * @description
 * The 'OfficeUI' controller allows us to set-up the core functions for an OfficeUI application.
 *
 * @dependencies $scope, $http, OfficeUIRibbonService.
 *               The $http dependency is required for loading up the json (ribbon) file dynamically.
 *
 * @element ANY
 */
OfficeUI.controller('OfficeUI', ['$scope', '$http', 'OfficeUIRibbonService', function($scope, $http, OfficeUIRibbonService) {
    var controllerData = this;

    /**
     * @ngdoc Function
     * @name Initialization
     *
     * @description
     * Performs some required initialization needed for the controller to load up correctly.
     *
     * @remarks
     * This function will load up the necessary data from a given file set in a JavaScript variable '$.fn.OfficeUI.applicationDataFile'.
     * For this reason, this variable needs to be set in a JavaScript call on the HTML page itself.
     * The data which is retrieved from this file is stored in a variable called 'data' under the 'scope'.
     */
    $http.get($.fn.OfficeUI.applicationDataFile)
        .success(function(data) {
            controllerData.Title = data.Title;
            controllerData.Icons = data.Icons;
        })
        .error(function(data) { console.error('An error occured while loading the file \'' + $.fn.OfficeUI.applicationDataFile + '\' file. '); });

    /**
     * @ngdoc Function
     * @name setActiveTab
     *
     * @description
     * Change the active tab on the ribbon element itself.
     *
     * @param tabId
     *        The id of the tab that oyu want to mark as active.
     */
    $scope.setActiveTab = function(tabId) {
        OfficeUIRibbonService.setActiveTab(tabId);
    }

    /**
     * @ngdoc Function
     * @name isTabActive
     *
     * @description
     * Check if a given tab is active, based on it's id.
     *
     * @param tabId
     *        The id of the element that identifies the tab to check.
     *
     * @returns {boolean} True is the given tab is active, false otherwise.
     */
    $scope.isTabActive = function(tabId) {
        return OfficeUIRibbonService.isTabActive(tabId);
    }

    /**
     * @ngdoc Function
     * @name isContextualGroupActive
     *
     * @description
     * Checks if any contextual group is being active.
     * By active, we do mean that an contextual group is showed.
     *
     * @returns {boolean} True if a given tab is active, false otherwise.
     */
    $scope.isContextualGroupActive = function() {
        return OfficeUIRibbonService.isContextualGroupActive();
    }

    /**
     * @ngdoc Function
     * @name isActiveContextualGroup
     *
     * @descrption Checks if a given contextual group is active.
     *
     * @param contextualGroupId
     *        The id of the contextual group that should be checked for being active.
     *
     * @returns {boolean} True if the requested contextual group is active, false otherwise.
     */
    $scope.isActiveContextualGroup = function(contextualGroupId) {
        return OfficeUIRibbonService.isActiveContextualGroup(contextualGroupId);
    }

    /**
     * @ngdoc activateContextualGroup
     * @name activateContextualGroup
     *
     * @description
     * Activate a contextual group based on it's id.
     *
     * @param contextualGroupId
     *        The id of the contextual group to activate.
     */
    $scope.activateContextualGroup = function(contextualGroupId) {
        OfficeUIRibbonService.activateContextualGroup(contextualGroupId);
    }

    /**
     * @ngdoc Function
     * @name deactivateContextualGroup
     *
     * @description Deactivate a contextual group based on it's id.
     *
     * @param contextualGroupId
     *        The id of the contextual group to deactivate.
     */
    $scope.deactivateContextualGroup = function(contextualGroupId) {
        OfficeUIRibbonService.deactivateContextualGroup(contextualGroupId);
    }

    /**
     * @ngdoc Function
     * @name setActiveTabColor
     *
     * @description
     * Set the color of an active tab, based on the id of the tab.
     *
     * @param tabId
     *        The id of the tab for which to set the color.
     * @param tabColor
     *        The color that the tab element should have.
     *
     * @returns {*} The color that the tab should have.
     */
    $scope.setActiveTabColor = function(tabId, tabColor) {
        var serviceInstance = OfficeUIRibbonService.getServiceInstance();

        if (serviceInstance.state == serviceInstance.ribbonStates.Showed || serviceInstance.state == serviceInstance.ribbonStates.Visible) {
            return OfficeUIRibbonService.setActiveTabColor(tabId, tabColor);
        }
    }

    /**
     * @ngdoc Function
     * @name toggleApplicationMenu
     *
     * @description
     * Toggle the application menu. This means that the application menu is opened if it's closed,
     * otherwise it's closed.
     */
    $scope.toggleApplicationMenu = function() {
        OfficeUIRibbonService.toggleApplicationMenu();
    }

    /**
     * @ngdoc Function
     * @name isApplicationMenuOpened
     *
     * @description
     * Checks if the application menu is opened or not.
     *
     * @returns {boolean|*}
     *          True if the application menu is opened, false otherwise.
     */
    $scope.isApplicationMenuOpened = function() {
        return OfficeUIRibbonService.isApplicationMenuOpened();
    }

    /**
     * @ngdoc Function
     * @name isRibbonInitialized
     *
     * @description
     * Checks if the ribbon is initialized.
     *
     * @returns {boolean|*}
     *          True if the ribbon is already initialized, false otherwise.
     */
    $scope.isRibbonInitialized = function() {
        return OfficeUIRibbonService.isRibbonInitialized();
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
        return OfficeUIRibbonService.isRibbonShowed();
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
        return OfficeUIRibbonService.isRibbonVisible();
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
        return OfficeUIRibbonService.isRibbonHidden();
    }
}]);