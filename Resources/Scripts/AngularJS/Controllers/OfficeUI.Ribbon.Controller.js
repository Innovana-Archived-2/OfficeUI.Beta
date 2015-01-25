/* Loads the module 'OfficeUIRibbon'. */
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

/* @ngdoc Controller
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
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', function($scope, $http) {
    var controllerData = this;

    controllerData.activeContextualGroups = []; // Defines a collection of contextual groups which are being active.
    controllerData.activeContextualTabs = null; // Defines the current active contextual tab.

    /* @ngdoc Function
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
            controllerData.Tabs = data.Tabs;
            controllerData.ContextualGroups = data.ContextualGroups;
            controllerData.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) { console.error('An error occured while loading the file \'' + $.fn.OfficeUI.ribbonDataFile + '\' file. '); })

    /* @ngdoc Function
     * @name setActive
     *
     * @description
     * Allows an object to set itself as active.
     *
     * @parameters
     * tabId        The id of the element which should be set as active.
     *
     * @element ANY
     *
     * @example
     *  <example module="setActiveExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-click="setActive(tab.Id)">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.setActive = function(tabId) {
        controllerData.activeTab = tabId;
    }

    /* @ngdoc Function
     * @name isActive
     *
     * @description
     * Checks if a given object is active.
     *
     * @parameters
     * tabId        The id of the element which should be checked.
     *
     * @element ANY
     *
     * @example
     *  <example module="IsActiveExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-click="isActive(tab.Id)">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.isActive = function(tabId) {
        return controllerData.activeTab == tabId;
    }

    /* @ngdoc Function
     * @name isContextualGroupActive
     *
     * @description
     * Checks if any contextual group is active.
     *
     * @element ANY
     *
     * @example
     *  <example module="isContextualGroupActiveExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-show="isContextualTabActive()">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.isContextualGroupActive = function() {
        return controllerData.activeContextualGroups.length > 0;
    }

    /* @ngdoc Function
     * @name activateContextualGroup
     *
     * @description
     * Activate a contextual group.
     *
     * @remarks
     * This method is only executed when the contextual group to active is not acivated yet.
     *
     * @parameters
     * contextualGroupId        The id of the contextual group which should be activated.
     *
     * @element ANY
     *
     * @example
     *  <example module="activateContextualGroupExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-show="activateContextualGroup('contextualTabId')">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.activateContextualGroup = function(contextualGroupId) {
        if (!$scope.isActiveContextualGroup(contextualGroupId)) { controllerData.activeContextualGroups.push(contextualGroupId); }
    }

    /* @ngdoc Function
     * @name deactivateContextualGroup
     *
     * @description
     * Activate a contextual group.
     *
     * @parameters
     * contextualGroupId        The id of the contextual group which should be deactivated.
     *
     * @element ANY
     *
     * @example
     *  <example module="deactivateContextualGroupExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-show="deactivateContextualGroup('contextualTabId')">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.deactivateContextualGroup = function(contextualGroupId) {
        // Gets the group that has been deactivated.
        var deactivedContextualGroup = $(controllerData.ContextualGroups).filter(function(index,item) {
            return item.Id == contextualGroupId;
        });

        // Checks if the contextual group which is being deactivated does hold a tab which is currently set active.
        var holdsActiveTab = $(deactivedContextualGroup[0].Tabs).filter(function(index,item) {
            return item.Id == controllerData.activeTab;
        });

        // If the contextual tab which is being hidden does have an active tab, change the active tab to the first tab on the ribbon.
        // This is to make sure that a tab stays selected.
        if (holdsActiveTab.length > 0) {
            $scope.setActive(controllerData.Tabs[1].Id);
        }

        controllerData.activeContextualGroups = jQuery.grep(controllerData.activeContextualGroups, function(value) {
            return value != contextualGroupId;
        });
    }

    /* @ngdoc Function
     * @name isActiveContextualGroup
     *
     * @description
     * Checks if a contextual group is active.
     *
     * @parameters
     * contextualGroupId        The id of the contextual group which should be checked against activation.
     *
     * @element ANY
     *
     * @example
     *  <example module="isActiveContextualGroupExample" deps="OfficeUI.min.js">
     *    <file name="index.html">
     *      <body ng-controller="OfficeUIRibbon as OfficeUIRibbon">
     *        <div ng-repeat="tab in OfficeUIRibbon.tabs" ng-show="isActiveContextualGroup('contextualTabId')">
     *        </div>
     *      </body>
     *    </file>
     *  </example>
     */
    $scope.isActiveContextualGroup = function(contextualGroupId) {
        var items = $(controllerData.activeContextualGroups).filter(function(index,item) {
            return item == contextualGroupId;
        });

        return items.length > 0;
    }
}]);