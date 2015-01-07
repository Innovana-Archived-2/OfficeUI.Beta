/* Provides a jQuery plugin for working with an OfficeUI application. */
(function ( $ ) {
    $.fn.OfficeUI = function(options) {

        // Provides the default options.
        var settings = $.extend({
        }, $.fn.OfficeUI.Defaults, options);

        // Return this object that allows chaining of this plugin.
        return this;
    }

    // Plugin defaults – added as a property on our plugin function.
    $.fn.OfficeUI.Defaults = { };

    $.fn.OfficeUI.bind = function(elementSelector, bound, action) {
        $(elementSelector).on(bound, function() { action(); });

        return this;
    };

    // Provide some external access to plugin functions.
}(jQuery));