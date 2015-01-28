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
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', 'OfficeUIRibbonService', function($scope, $http, OfficeUIRibbonService) {
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
            //controllerData.Tabs = data.Tabs;
            //controllerData.ContextualGroups = data.ContextualGroups;
            //controllerData.activeTab = data.Tabs[1].Id;

            OfficeUIRibbonService.setServiceInstance(data);
            $scope.OfficeUIRibbon = OfficeUIRibbonService.getServiceInstance();
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
        OfficeUIRibbonService.setActive(tabId);
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
        return OfficeUIRibbonService.isActive(tabId);
    }
}]);