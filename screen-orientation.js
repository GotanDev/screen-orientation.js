/*!
 * Tools for screen orientation in web .
 *
 * @see https://github.com/GotanDev/screen-rotation.js
 * @author Damien Cuvillier <damien.cuvillier@gotan.io>
 * @licence MIT
 */
var screenorientation = (function() {
    /** Listeners lists on orientation change event */
    screenOrientationChangeListenerCallbacks = [];


    /*  Detect screen orientation change.
     * Calls all declared callbacks.
     */
    function detectScreenOrientationChange() {
        if (navigator.userAgent.indexOf('Safari') !== -1) {
            window.matchMedia("(orientation: portrait)").addListener(triggerOrientationChange)
        } else if (navigator.userAgent.indexOf('Mozilla') !== -1) {
            window.screen.onmozorientationchange = triggerOrientationChange;
        } else {
            window.screen.orientation.onchange = triggerOrientationChange;
        }
    }

    /** Trigger all declared callbacks
     */
    function triggerOrientationChange() {
        for (let listener of screenOrientationChangeListenerCallbacks) {
            listener(_self);
        }
    }

    /** Get screen orientation angle.
     * @returns {number} 90|0
     */
    function getAngle() {
        if (window.matchMedia('(orientation: portrait)').matches) {
            return 90;
        }
        if (window.matchMedia('(orientation: landscape)').matches) {
            return 0;
        }

        if (window.orientation != null) {
            // Safari
            return parseInt(window.orientation, 0);
        }
        return 0;
    }

    /**
     * Add listener or trigger change event if no callback provided.
     *
     * @param callback null|function Call back function on orientation change event
     */
    function onchange(callback) {
        // Trigger event
        if (typeof callback === 'undefined') {
            triggerOrientationChange();
            return this;
        }
        // Add listener
        if (typeof callback !== 'function'){
            throw 'Provided callback for screen orientation change is not a function';
        }
        screenOrientationChangeListenerCallbacks.push(callback);
        return this;
    }



    /** Is screen in landscape mode.
     */
    function isLandscape() {
        return Math.abs(getAngle() / 90) !== 1;
    }

    /** Is screen in portrait mode.
     */
    function isPortrait() {
        return !isLandscape();
    }

    /* Constructor */
    detectScreenOrientationChange();


    /* Public features. */
    const _self = {
        'angle': getAngle,
        'isLandscape': isLandscape,
        'isPortrait': isPortrait,
        'change': onchange
    }

    return _self;
})



