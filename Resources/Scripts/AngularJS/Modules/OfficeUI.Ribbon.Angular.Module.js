/* @ngdoc Module
 * @name OfficeUI
 *
 * @description
 * The OfficeUI module is the main module for applications that are running on the Office User Interface Suite.
 *
 * @dependencies
 * ngSanitize, ngAnimate
 */
var OfficeUIRibbon = angular.module('OfficeUIRibbon', ['ngSanitize', 'ngAnimate']);

OfficeUIRibbon.factory('OfficeUIRibbonService', ['$http', function($http) {
    var serviceInstance = {
        activeTab: null,
        ContextualGroups: null,
        activeTab: null
    };

    return {
        setActive: function(tabId) {
            serviceInstance.activeTab = tabId;

            return serviceInstance;
        },

        isActive: function(tabId) {
            return serviceInstance.activeTab == tabId;
        },

        setServiceInstance: function(data) {
            serviceInstance = data;
            serviceInstance.ContextualGroups = data.ContextualGroups;
            serviceInstance.activeTab = data.Tabs[1].Id;
        },
        getServiceInstance: function() { return serviceInstance; }
    };
}]);

