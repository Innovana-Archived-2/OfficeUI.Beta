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
     * @description
     * Defines the various states that the ribbon can have.
     * The ribbon can have 3 different states.
     * See the information below to find out when the ribbon has which state.
     *
     * @type {{Hidden: number, Visible: number, Showed: number}}
     *         Hidden:  The ribbon is hidden completely from view, however, it can be showed again when clicking on one of the tabs.
     *         Visible: The ribbon is visible, but will not remain visible for the user. As soon as the user has lost focus on the ribbon, it
     *                  will hide itself from view again.
     *         Showed:  The ribbon is showed and stays at this state until it's instructed by the user to remove state.
     */
    var ribbonStates = {
        Hidden: 1,      // The ribbon is not showed, in other words, it's collapsed.
        Visible: 2,     // The ribbon is visible, but will not be visible anymore after a click somewhere on the screen.
        Showed: 3       // The ribbon is showed and stays showed no matter where you click on the page.
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
            $scope.OfficeUIRibbon.state = ribbonStates.Showed;
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
        return $scope.OfficeUIRibbon.state == ribbonStates.Showed;
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
        return $scope.OfficeUIRibbon.state == ribbonStates.Visible;
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
        return $scope.OfficeUIRibbon.state == ribbonStates.Hidden;
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
        if ($scope.OfficeUIRibbon.state == ribbonStates.Showed) { $scope.OfficeUIRibbon.state = ribbonStates.Hidden; }
        else if ($scope.OfficeUIRibbon.state == ribbonStates.Visible) { $scope.OfficeUIRibbon.state = ribbonStates.Showed; }
    }
}]);