/* Defines the initialize function of the ribbon. */
var Ribbon = {
    // Variable area.
    changeTabOnHover: null,
    
    // Constants area.
    collapsedCookieName: 'OfficeUIRibbon.Collapsed',

    // Defines the variables for the module.
    scope: null,

    // Initialize the ribbon, thus adding various event handlers on different elements that affects the ribbon.
    // Parameters:
    //      $scope:             The scope of the 'AngularJS' module.
    //      ribbon:             The ribbon element that needs to be initialized.
    //      contentsSelector:   The selector to select the contents of the ribbon.
    //      tabsSelector:       The selector to select the tabs of the content.
    Initialize: function($scope, ribbon, contentsSelector, tabsSelector) {
        Ribbon.scope = $scope;

        // Executed when you click somewhere on the page.
        $(window).on('click', function(e) {
            // Check if the state of the ribbon is 'Overlay'.
            if (ribbon.state == 3) {
                var tabContentsElement = $(contentsSelector);

                tabContentsElement.curtain({ duration: 250 }, function() {
                    Ribbon.scope.setRibbonState(2);
                    Ribbon.scope.refresh();
                });
            }
        });

        // When you click on the tabs somewhere when the ribbon status is 'Overlay', don't do anything.
        $(tabsSelector).on('click', function(e) {
            if (ribbon.state == 3) {
                e.stopPropagation();
                return false;
            }
        });

        // Read the value of the cookie
        if (RetrieveCookie(Ribbon.collapsedCookieName, 'false') == 'true') {
            ribbon.state = 2;
            ribbon.height = '0px'
        } else {
            ribbon.state = 1;
        }
    }, 
    
    // Provides some configuration for the OfficeUI Ribbon.
    config: function(options) {
        var settings = $.extend({
            changeTabOnHover: false
        }, options);
        
        Ribbon.changeTabOnHover = settings.changeTabOnHover;
    }
}