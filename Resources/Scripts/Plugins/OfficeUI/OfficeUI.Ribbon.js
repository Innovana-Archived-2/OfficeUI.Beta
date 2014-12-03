/* Defines the initialize function of the ribbon. */
var Ribbon = {

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
                    Ribbon.scope.collapseRibbon('hide');
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
    }
}
