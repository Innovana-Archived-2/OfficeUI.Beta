/**
 * @ngdoc Module
 * @name OfficeUI
 *
 * @description
 * The OfficeUI module is the main module for applications that are running on the Office User Interface Suite.
 *
 * @dependencies ngSanitize, ngAnimate
 */
var OfficeUIRibbon = angular.module('OfficeUIRibbon', ['ngSanitize', 'ngAnimate']);

/**
 * @ngdoc Service
 * @name OfficeUIRibbonService
 *
 * @description
 * Provides a service which exposes common functionalities on the OfficeUI ribbon.
 */
OfficeUIRibbon.factory('OfficeUIRibbonService', function() {
    var serviceInstance = {
        activeContextualGroups: []
    };

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
         *        The data which is being used for initialization.
         */
        setServiceInstance: function(data) {
            serviceInstance = data;
            serviceInstance.activeContextualGroups = [];
            serviceInstance.ContextualGroups = data.ContextualGroups;
            serviceInstance.activeTab = data.Tabs[1].Id;
        },

        /**
         * @ngdoc Function
         * @name getServiceInstance
         *
         * @description
         * Gets the data that this service is currently holding.
         *
         * @returns {object}
         *          The data that this service is holding.
         */
        getServiceInstance: function() { return serviceInstance; },

        /**
         * @ngdoc Function
         * @name setActive
         *
         * @description
         * Change the active tab on the ribbon element itself.
         *
         * @param tabId
         *        The id of the tab that oyu want to mark as active.
         */
        setActive: function(tabId) {
            serviceInstance.activeTab = tabId;
        },

        /**
         * @ngdoc Function
         * @name isActive
         *
         * @description
         * Check if a given tab is active, based on it's id.
         *
         * @param tabId
         *        The id of the element that identifies the tab to check.
         *
         * @returns {boolean} True is the given tab is active, false otherwise.
         */
        isActive: function(tabId) {
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
                $scope.setActive(serviceInstance.Tabs[1].Id);
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
        }
    };
});

