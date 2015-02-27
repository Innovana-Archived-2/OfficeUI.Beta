(function ( $ ) {
    $.fn.OfficeUI.ThemeManager = function(options) {

        // Provides the default options.
        var settings = $.extend({
        }, $.fn.OfficeUI.Defaults, options);

        // Return this object that allows chaining of this plugin.
        return this;
    }

    $.fn.OfficeUI.ThemeManager.Themes = {
        Blue: 'Blue',
        Green: 'Green',
        LightBlue: 'LightBlue',
        Orange: 'Orange',
        Purple: 'Purple',
        Red: 'Red',
        Turquoise: 'Turquoise'
    }

    $.fn.OfficeUI.ThemeManager.SetTheme = function(theme) {
        var themeFile = '/Resources/Stylesheets/Styles/' + theme + '/OfficeUI.Style.' + theme + '.min.css';
        $('head').append('<link rel="stylesheet" href="' + themeFile + '" type="text/css" />');
    }
}(jQuery));
