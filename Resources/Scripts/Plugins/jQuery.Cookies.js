// Create a cookie with a given name, value and the expiration time in days.
// Parameters:
//      name:       The name of the cookie.
//      value:      The value that the cookie should have.
//      expires:    The amount of days that the cookie should be kept before it's removed.
function CreateCookie(name, value, expires) {
    var d = new Date();
    d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
    
    var expires = "expires="+d.toUTCString();
    
    document.cookie = name + "=" + value + "; " + expires;
}

// Retrieve a given cookie by it's name.
// Parameters:
//      name:       The name of the cookie to retrieve.
function RetrieveCookie(name) {
    return (RetrieveCookie(name, ''));
}

function RetrieveCookie(name, defaultValue) {
    name = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return defaultValue;
}