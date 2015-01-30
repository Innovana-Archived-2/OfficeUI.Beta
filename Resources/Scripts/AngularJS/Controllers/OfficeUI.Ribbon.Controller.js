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
        })
        .error(function(data) { console.error('An error occured while loading the file \'' + $.fn.OfficeUI.ribbonDataFile + '\' file. '); })

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

    $scope.ribbonScroll = function(scrollEvent) {
        if (scrollEvent.detail > 0 || scrollEvent.wheelDelta < 0) {
            var nextTab = $('.ribbon .active').next();

            if (nextTab.attr('id') != null) {
                $scope.setActive(nextTab.attr('id'));
            }
        } else {
            var previousTab = $('.ribbon .active').prev();

            if (previousTab.attr('id') != null && !previousTab.hasClass('application')) {
                $scope.setActive(previousTab.attr('id'));
            }
        }

        $scope.$apply();
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
            $scope.OfficeUIRibbon.state = $scope.OfficeUIRibbon.ribbonStates.Hidden;

            $scope.$apply();
        }
    });
}]);