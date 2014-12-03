/* OfficeUI Ribbon AngularJS module.
 *  
 *  The OfficeUI Ribbon module is a way to recreate the Office Ribbon in plain HTML.
 *  An an input source, the module is based on the visual representation of the Office Ribbon in Microsoft Outlook 2013.
 *
 *  The following information is important for this module.
 *  
 *      - ribbonState:      Defines the state of the ribbon and can contain the following values:
 *                              1: Normal (Ribbon is showed).
 *                              2: Collapsed (Ribbon is hidden).
 *                              3: Overlay (Ribbon is collapsed but is showed just now).
 */

// Contents area.
var collapsedCookieName = 'OfficeUIRibbon.Collapsed';

/* Loads the AngularJS module 'OfficeUI.Ribbon'. 
   Parameters:
        Name:           The name of the AngularJS module.
        
   Remarks: We're using the function 'module' of AngularJS here which accepts only 1 single parameter.
            This signature defines that we're only loading the AngularJS module 'OfficeUI.Ribbon'.
*/
var OfficeUIRibbon = angular.module('OfficeUIRibbon');

// Defines the OfficeUIRibbon controller for the application.
OfficeUIRibbon.controller('OfficeUIRibbon', ['$scope', '$http', function($scope, $http) {
    var ribbon = this;
    
    // Make sure that when you click anywhere and the ribbon status is 'Overlay', that the ribbon does hide itself again.
    $(window).on('click', function(e) {
       if (ribbon.state == 3) {
            var tabContentsElement = $('ul[role=tabContents]');
                
            tabContentsElement.curtain({ duration: 250 }, function() {
               $scope.collapseRibbon('hide');
            });
       } 
    });
    
    // When you click on the tabs somewhere when the ribbon status is 'Overlay', don't do anything.
    $('ul[role=tabs], ul[role=tabContents]').on('click', function(e) {
        if (ribbon.state == 3) {
            e.stopPropagation();
            return false;
        }
    });
    
    // Based on the cookie value, set the state of the ribbon.
    if (RetrieveCookie(collapsedCookieName, 'false') == 'true') {
        ribbon.state = 2;
        ribbon.height = '0px'
    } else {
        ribbon.state = 1;
    }
    
    // Get the Json file 'ribbon.json' that defines the ribbon data.
    $http.get('/Resources/JSon/Ribbon/ribbon.json')
        .success(function(data) {
            ribbon.Tabs = data.Tabs;
            
            // Sets the second tab as the active one. The second one is the tab next to the application tab.
            ribbon.activeTab = data.Tabs[1].Id;
        })
        .error(function(data) {
            console.log('An error occured while loading the \'ribbon.json\' file.');
        });
    
    // Sets the currently active tab based on it's id.
    this.setTab = function(tabId) {
        ribbon.activeTab = tabId;
        
        // First, we need to check if the ribbon is hidden or not, based on that, we might need to animate the element to
        // show the ribbon again.
        if (ribbon.state == 2) {
            var ribbonContents = $('ul[role=tabContents]');
            
            ribbonContents.curtain({ direction: 'down', height: 92 });
            
            ribbon.state = 3;
        }
    }
    
    // Check if a given tab is active based on it's id.
    this.isActive = function(tabId) {
        return this.activeTab == tabId;
    }
    
    // Defines the function that is fired when we're scrolling over the ribbon.
    $scope.ribbonScroll = function(scrollEvent) {
        // Based on scrolling up or down, some other events needs to be executed.
        if (scrollEvent.originalEvent.detail > 0 || scrollEvent.originalEvent.wheelDelta > 0) {
            if ($('li[role=tab].active').next().attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').next().attr('id'));
            }
        } else {
            if ($('li[role=tab].active').prev().not('.application').attr('id') != null) {
                ribbon.setTab($('li[role=tab].active').prev().attr('id'));
            }
        }
        
        $scope.refresh(); // Update the view.
    }
    
    // Collapse the ribbon.
    // Parameters:  
    //      State:      The state that the ribbon does have. 2 values are allowed 'hide' and 'show'.
    $scope.collapseRibbon = function(state) {
        if (state != 'hide' && state != 'show') {
            console.error('Only \'hide\' and \'show\' are valid parameters for the \'collapseRibbon\' function.');
        } else if (state == 'hide') {
            CreateCookie(collapsedCookieName, 'true', 365);
            ribbon.state = 2;
        } else if (state == 'show') {
            CreateCookie(collapsedCookieName, 'false', 365);
            
            var officeUIContents = $('#contents').addClass('officeui-position-absolute').animate({top: 146 }, 250, function() {
                $(this).removeClass('officeui-position-absolute');
                ribbon.state = 1;
                $scope.refresh();
            });
        }
        
        $scope.refresh(); // Update the view since we've collapsed the ribbon for the moment.
    }
    
    // Refresh the view so that it's updated with the correct data.
    $scope.refresh = function() {
        $scope.$apply();
    };
}]);