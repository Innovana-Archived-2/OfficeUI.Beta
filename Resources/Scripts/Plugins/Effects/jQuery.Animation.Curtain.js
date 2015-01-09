/*  jQuery Curtain Plugin version 1.0 - Kevin De Coninck

    Provides a jQuery curtain like animation.
    Version 1.0
    
    In jQuery you can shrink object by default so that they don't take up any space on the page.
    This plugin allows you to do the same, but the content of the area is also raised.
    This gives the impression that the area is not shrinked, but instead it's raised up together with the content and is placed
    behind an invisible container.
    
    It's tough to explain this in this kind of setup, but it should make things clear when you try to use it.
    
    Parameters:
    
        direction:      default (up)        Explanation:    Defines the direction in which the curtain is raised.
                                                            There are 2 possible scenario's, 'up' and 'down'.
                                                            
        duration:       default (250)       Explanation:    The time it should take for the entire animation to complete.
        
        height:         default (0)         Explanation:    The height that the element should have when the curtain is raised.
                                                            This property is only needed when the curtain is moved 'down'.
                                                            
    Usage:
    
        - To raise the curtain:             $(element).curtain();
        - To lower curtain:                 $(element).curtain({
                                                direction: 'down',
                                                height: 200
                                            })
 */
(function($) {
    $.fn.curtain = function(options, callback) {
        
        // Provides the default options.
        var settings = $.extend({
        }, $.fn.curtain.Defaults, options);
        
        // The exact logic of the plugin is written here.
        var elementHeight = $(this).height();
        
        // Check if the curtain should be raised or lowered.
        if (settings.direction == 'up') {
            $(this).animate({
                height:0
            }, settings.duration);
                
            $(this).children().animate({
                'margin-top':'-' + elementHeight + 'px'
            }, settings.duration, function() {
                // Execute the callback function when it's defined.
                if ($.isFunction(callback)) {
                    callback(this);
                }
            });
            
        } else if (settings.direction == 'down') {
            if (settings.height == 0) { console.error('You need to specify the height when the curtain is being lowered.'); }
            else { 
                $(this).animate({
                    height:settings.height
                }, settings.duration);
                
                $(this).children().animate({
                    'margin-top':'0px'
                }, settings.duration, function() {
                    // Execute the callback function when it's defined.
                    if ($.isFunction(callback)) {
                        callback(this);
                    }
                });
            }
        } else { console.log('The curtain cannot be moved in this direction.'); }
        

        // Return this object that allows chaining of this plugin.
        return this;
    }
    
    // Plugin defaults – added as a property on our plugin function.
    $.fn.curtain.Defaults = {
        direction: 'up',
        duration: 250,
        height: 0
    };
    
}(jQuery));