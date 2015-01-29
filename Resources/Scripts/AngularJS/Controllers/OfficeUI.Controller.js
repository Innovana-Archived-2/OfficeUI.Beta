/* Loads the module 'OfficeUI'. */
var OfficeUI = angular.module('OfficeUI');

/**
 * @ngdoc Controller
 * @name OfficeUI
 *
 * @description
 * The 'OfficeUI' controller allows us to set-up the core functions for an OfficeUI application.
 *
 * @dependencies $http
 *
 * @element ANY
 *
 * @example
 *  <example module="OfficeUIExample">
 *    <file name="index.html">
 *      <body ng-controller="OfficeUI as OfficeUI"></body>
 *    </file>
 *  </example>
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
     *
     * @example
     * <example module="OfficeUIInitializationExample" deps="OfficeUI.min.js">
     *   <file name="index.html">
     *     <body ng-controller="OfficeUI as OfficeUI"></body>
     *   </file>
     * </example>
     */
    $http.get($.fn.OfficeUI.applicationDataFile)
        .success(function(data) {
            controllerData.Title = data.Title;
            controllerData.Icons = data.Icons;
        })
        .error(function(data) { console.error('An error occured while loading the file \'' + $.fn.OfficeUI.applicationDataFile + '\' file. '); });

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
    $scope.setActive = function(tabId) {
        OfficeUIRibbonService.setActive(tabId);
    }

    /**
     * @description
     * Check if a specific tab is active.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.isActive = function(tabId) {
        return OfficeUIRibbonService.isActive(tabId);
    }

    /**
     * @description
     * Check if any contextual group is active.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.isContextualGroupActive = function() {
        return OfficeUIRibbonService.isContextualGroupActive();
    }

    /**
     * @description
     * Check if a contextual group is being active.
     * By active, we mean that that contextual group is being showed.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.isActiveContextualGroup = function(contextualGroupId) {
        return OfficeUIRibbonService.isActiveContextualGroup(contextualGroupId);
    }

    /**
     * @description
     * Set a specific contextual group as being active.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.activateContextualGroup = function(contextualGroupId) {
        OfficeUIRibbonService.activateContextualGroup(contextualGroupId);
    }

    /**
     * @description
     * Deactivate a specific contextual group.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.deactivateContextualGroup = function(contextualGroupId) {
        OfficeUIRibbonService.deactivateContextualGroup(contextualGroupId);
    }

    /**
     * @description
     * Set a tab it's color.
     *
     * @remarks
     * See the OfficeUIRibbonService source code for a more detailed explanation of this function.
     */
    $scope.setActiveTabColor = function(tabId, tabColor) {
        return OfficeUIRibbonService.setActiveTabColor(tabId, tabColor);
    }
}]);