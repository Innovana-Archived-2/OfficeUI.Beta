/**
 * @ngdoc Module
 * @name OfficeUIRibbon
 *
 * @description
 * The OfficeUIRibbon module is the main module for implementing a ribbon in the OfficeUI style.
 *
 * @dependencies ngSanitize, ngAnimate
 */
var OfficeUIRibbon = angular.module('OfficeUIRibbon', ['ngSanitize', 'ngAnimate']);

/**
 * @ngdoc Service
 * @name OfficeUIRibbonService
 *
 * @description
 * Provides a service which exposes common functionality on the OfficeUI ribbon.
 * Those methods, which are defined in the 'OfficeUIRibbonService' are in fact the API which can be access.
 */
OfficeUIRibbon.factory('OfficeUIRibbonService', function() {
    // Defines the main object that contains the instance of the service.
    // Various properties in this object will be changed.
    var serviceInstance = {};
    serviceInstance.activeContextualGroups = [];

    /**
     * @description
     * Defines the various states that the ribbon can have.
     * The ribbon can have 3 different states.
     * See the information below to find out when the ribbon has which state.
     *
     * @type {{Hidden: number, Visible: number, Showed: number}}
     *         Hidden:  The ribbon is hidden completely from view, however, it can be showed again when clicking on one of the tabs.
     *         Visible: The ribbon is visible, but will not remain visible for the user. As soon as the user has lost focus on the ribbon
     *                  (by clicking somewhere on the page for example), it will hide itself from view again.
     *         Showed:  The ribbon is showed and stays at this state until it's instructed by the user to remove state.
     */
    var ribbonStates = { Hidden: 1, Visible: 2, Showed: 3 }

    /**
     * @description
     * Defines a boolean that indicates if the ribbon is initialized.
     *
     * @type {boolean}
     * True if the ribbon is initialized, false otherwise.
     */
    var initialized = false;

    /* Provides the data and functions that this service does expose. */
    return {
        /**
         * @ngdoc Function
         * @name setServiceInstance
         *
         * @description
         * Initializes the service with initial data.
         *
         * @param data
         *        The data which is being used for initialization. Typically, this data is retrieved from a Json file
         *        but the data can be stored at any location from which it's injected into this function.
         *
         * @remarks
         * By default the 2nd tab which is defined in the Json file is set as the default one.
         * Not the first one because this one is the application tab.
         * Also, by default the state of the ribbon is set to 'Showed'.
         */
        setServiceInstance: function(data) {
            serviceInstance = data;
            serviceInstance.ribbonStates = ribbonStates;
            serviceInstance.activeContextualGroups = [];
            serviceInstance.ContextualGroups = data.ContextualGroups;
            serviceInstance.activeTab = data.Tabs[1].Id;
            serviceInstance.state = ribbonStates.Showed;
        },

        /**
         * @ngdoc Function
         * @name getServiceInstance
         *
         * @description
         * Gets the data that this service is currently holding.
         * This is needed because the data that the service instance is holding might be retrieved from a controller.
         *
         * @returns {object}
         *          The data that this service is holding.
         */
        getServiceInstance: function() { return serviceInstance; },

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
        setActiveTab: function(tabId) {
            serviceInstance.isApplicationMenuActive = false;

            if (serviceInstance.state == ribbonStates.Hidden) { serviceInstance.state = ribbonStates.Visible; }
            serviceInstance.activeTab = tabId;
        },

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
        isTabActive: function(tabId) {
            return serviceInstance.activeTab == tabId;
        },

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
        isContextualGroupActive: function() {
            return serviceInstance.activeContextualGroups.length > 0;
        },

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
        isActiveContextualGroup: function(contextualGroupId) {
            var items = $(serviceInstance.activeContextualGroups).filter(function (index, item) {
                return item == contextualGroupId;
            });

            return items.length > 0;
        },

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
        activateContextualGroup: function(contextualGroupId) {
            if (!this.isActiveContextualGroup(contextualGroupId)) { serviceInstance.activeContextualGroups.push(contextualGroupId); }
        },

        /**
         * @ngdoc Function
         * @name deactivateContextualGroup
         *
         * @description Deactivate a contextual group based on it's id.
         *
         * @param contextualGroupId
         *        The id of the contextual group to deactivate.
         */
        deactivateContextualGroup: function(contextualGroupId) {
            // Gets the group that has been deactivated.
            var deactivedContextualGroup = $(serviceInstance.ContextualGroups).filter(function(index,item) {
                return item.Id == contextualGroupId;
            });

            // Checks if the contextual group which is being deactivated does hold a tab which is currently set active.
            var holdsActiveTab = $(deactivedContextualGroup[0].Tabs).filter(function(index,item) {
                return item.Id == serviceInstance.activeTab;
            });

            // If the contextual tab which is being hidden does have an active tab, change the active tab to the first tab on the ribbon.
            // This is to make sure that a tab stays selected.
            if (holdsActiveTab.length > 0) {
                $scope.setActiveTab(serviceInstance.Tabs[1].Id);
            }

            serviceInstance.activeContextualGroups = jQuery.grep(serviceInstance.activeContextualGroups, function(value) {
                return value != contextualGroupId;
            });
        },

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
        setActiveTabColor: function(tabId, tabColor) {
            if (serviceInstance.activeTab == tabId) { return tabColor; }
        },

        /**
         * @ngdoc Function
         * @name toggleApplicationMenu
         *
         * @description
         * Toggle the application menu. This means that the application menu is opened if it's closed,
         * otherwise it's closed.
         */
        toggleApplicationMenu: function() {
            if (!serviceInstance.isApplicationMenuActive) {
                serviceInstance.isApplicationMenuActive = true;
            } else {
                serviceInstance.isApplicationMenuActive = false;
            }
        },

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
        isApplicationMenuOpened: function() {
            return serviceInstance.isApplicationMenuActive;
        },

        /**
         * @ngdoc Function
         * @name setRibbonInitialized
         *
         * @description
         * Sets the ribbon as being initialized.
         */
        setRibbonInitialized: function() {
            initialized = true;
        },

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
        isRibbonInitialized: function() {
            return initialized;
        },

        /**
         * @ndgoc Function
         * @name isRibbonShowed
         *
         * @description
         * Check if the current state of the ribbon is 'Showed'.
         *
         * @returns {boolean} True if the ribbon's state is set to 'Showed', false otherwise.
         */
        isRibbonShowed: function() {
            return serviceInstance.state == ribbonStates.Showed;
        },

        /**
         * @ndgoc Function
         * @name isRibbonVisible
         *
         * @description
         * Check if the current state of the ribbon is 'Visible'.
         *
         * @returns {boolean} True if the ribbon's state is set to 'Visible', false otherwise.
         */
        isRibbonVisible: function() {
            return serviceInstance.state == ribbonStates.Visible;
        },

        /**
         * @ndgoc Function
         * @name isRibbonHidden
         *
         * @description
         * Check if the current state of the ribbon is 'Hidden'.
         *
         * @returns {boolean} True if the ribbon's state is set to 'Hidden', false otherwise.
         */
        isRibbonHidden: function() {
            return serviceInstance.state == ribbonStates.Hidden;
        },

        /**
         * @ngdoc Function
         * @name disableAction
         *
         * @description
         * Disable an action based on the id of the action.
         *
         * @param action    The id of the action to disable.
         */
        disableAction: function(action) {
            var item = JSON.search(serviceInstance, '//Tabs//Groups//Areas//Actions[Id="' + action + '"]');

            // If the item has been found, then we can disable it.
            if (item.length == 1) {
                item[0].Disabled = "True";
            }
        },

        /**
         * @ngdoc Function
         * @name enableAction
         *
         * @description
         * Enable an action based on the id of the action.
         *
         * @param action    The id of the action to enable.
         */
        enableAction: function(action) {
            var item = JSON.search(serviceInstance, '//Tabs//Groups//Areas//Actions[Id="' + action + '"]');

            // If the item has been found, then we can disable it.
            if (item.length == 1) {
                item[0].Disabled = "False";
            }
        }
    };
});

