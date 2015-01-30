(function ( $ ) {
    $.fn.OfficeUI = function(options) {

        // Provides the default options.
        var settings = $.extend({
        }, $.fn.OfficeUI.Defaults, options);

        // Return this object that allows chaining of this plugin.
        return this;
    }

    // Plugin defaults – added as a property on our plugin function.
    $.fn.OfficeUI.Defaults = {
        changeActiveTabOnHover: false,
        theme: 'Blue'
    };

    $.fn.OfficeUI.waitHandleShowTooltip = null; // A timeout handle for showing tooltips on the ribbon.
    $.fn.OfficeUI.waitHandleHideTooltip = null; // A timeout handle for hiding tooltips on the ribbon.
    $.fn.OfficeUI.applicationDataFile = null; // The file in which the application data is stored.
    $.fn.OfficeUI.ribbonDataFile = null; // The file in which the ribbon data is stored.

    var eventCollection = []; // Defines a private collection of registered events.

    // Bind a given event handler to a specific element.
    // Parameters:
    //      element:        The element on which to bind the handler.
    //      handler:        The handler that's being executed.
    //      action:         The action to execute.
    $.fn.OfficeUI.bind = function(element, handler, action) {
        eventCollection.push({
            element: element,
            handler: handler,
            action: action
        });
    };

    // Provides a way to search for an event for a given element.
    // Parameters:
    //      element:        The name of the element for which to search the event.
    $.fn.OfficeUI.searchEvent = function(element) {
        // Search if an event is registered by looping over the array that holds all are events.
        // If an event is found, return this.
        var foundElement = $.grep(eventCollection, function(item) {
            return item.element == '#' + element
        });

        // Return the correct element if there is any, otherwise, return null.
        if (foundElement.length != 0) {
            return foundElement[0];
        }

        return null;
    };

    // Change the currently active tab on the ribbon.
    // This is done by specifying the id of the tab.
    $.fn.OfficeUI.setActiveTab = function(element) {
        angular.element(document.querySelector('#OfficeUI')).scope().setActiveTab(element);
    };
}(jQuery));