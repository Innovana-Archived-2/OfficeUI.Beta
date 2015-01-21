var OfficeUIRibbon = angular.module('OfficeUIRibbon');

OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', '$animate', function($scope, $http, $animate) {
    var ribbonStates = {
        Hidden: 1,
        Visible: 2,
        Showed: 3
    }

    var ribbon = this;

    ribbon.state = ribbonStates.Showed;

    $http.get("/OfficeUI.Beta/Resources/Data/ribbon.json")
        .success(function(data) {
            ribbon.Tabs = data.Tabs;

            var firstApplicationMenuEntryID = ribbon.Tabs[0].MenuItems[0];
            $scope.setApplicationMenuItemAsActive(firstApplicationMenuEntryID);

            ribbon.activeTab = data.Tabs[1].Id;

            ribbon.applicationMenuActive = false;
        })
        .error(function(data) {
            console.error('An error occured while loading the data file.');
        });

    $scope.setApplicationMenuItemAsActive = function(applicationMenuItem) {
        ribbon.setApplicationMenuItemAsActive(applicationMenuItem);
    }

    ribbon.setApplicationMenuItemAsActive = function(applicationMenuItem) {
        if (applicationMenuItem.Seperator != 'True') {
            ribbon.activeApplicationMenuItem = applicationMenuItem;
        }
    }

    ribbon.isApplicationMenuActive = function(applicationMenuItem) {
        return ribbon.activeApplicationMenuItem == applicationMenuItem;
    }

    ribbon.setApplicationMenuAsOpened = function() {
        ribbon.applicationMenuActive = true;
    }

    ribbon.setApplicationMenuAsClosed = function() {
        ribbon.applicationMenuActive = false;
    }

    ribbon.isApplicationMenuOpened = function() {
        return ribbon.applicationMenuActive;
    }

    ribbon.isActive = function(tabId) {
        return this.activeTab == tabId;
    }

    ribbon.setActiveTab = function(tabId) {
        ribbon.activeTab = tabId;

        if (ribbon.state == ribbonStates.Hidden) {
            ribbon.state = ribbonStates.Visible;
        }
    }

    ribbon.setActiveTabOnHover = function(tabId) {
        if ($.fn.OfficeUI.Defaults.changeActiveTabOnHover) {
            ribbon.activeTab = tabId;

            if (ribbon.state == ribbonStates.Hidden) {
                ribbon.state = ribbonStates.Visible;
            }
        }
    }

    ribbon.isHidden = function() {
        return ribbon.state == ribbonStates.Hidden;
    }

    ribbon.isVisible = function() {
        return ribbon.state == ribbonStates.Visible;
    }

    ribbon.isShowed = function() {
        return ribbon.state == ribbonStates.Showed;
    }

    ribbon.toggleRibbonState = function() {
        if (ribbon.state == ribbonStates.Showed) {
            ribbon.state = ribbonStates.Hidden;
        } else if (ribbon.state == ribbonStates.Visible) {
            ribbon.state = ribbonStates.Showed;
        }
    }

    $scope.setActiveTab = function(tabId) {
        ribbon.setActiveTab(tabId);

        $scope.$apply();
    }

    $scope.setRibbonHidden = function() {
        ribbon.state = ribbonStates.Hidden;

        $scope.$apply();
    }

    $scope.setRibbonVisisble = function() {
        ribbon.state = ribbonStates.Visible;

        $scope.$apply();
    }

    $scope.setRibbonShowed = function() {
        ribbon.state = ribbonStates.Showed;

        $scope.$apply();
    }

    $scope.isHidden = function() {
        return ribbon.isHidden();
    }

    $scope.isVisible = function() {
        return ribbon.isVisible();
    }

    $scope.isShowed = function() {
        return ribbon.isShowed();
    }

    $scope.ribbonScroll = function(scrollEvent) {
        if (scrollEvent.detail > 0 || scrollEvent.wheelDelta < 0) {
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setActiveTab($('li[role=tab].active').prev().attr('id'));
            }
        }

        $scope.$apply();
    }

    $(window).on('click', function(e) {
        if (ribbon.state == ribbonStates.Visible) {
            $scope.setRibbonHidden();
        }
    });

    $('#ribbonContents').on('click', function(e) {
        e.stopPropagation();
    });
}]);