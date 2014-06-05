/**
A controller object that can be used to control
events in the game through key presses
*/
function createController() {
     var controller = new GameObject();

    //================================
    // Private functions and variables
    //================================
    var keyMappings = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var keyEvents = {};
    var keyStates = {};

    for (var code in keyMappings) {
        var key = keyMappings[code];
        keyStates[key] = "up";
    }

    function onKeyDown(event) {
        var code = event.keyCode;
        var key = keyMappings[code];
        keyEvents[key] = "pressed"; // only allow press if lalaal
    }

    function onKeyUp(event) {
        var code = event.keyCode;
        var key = keyMappings[code];
        keyEvents[key] = "released";
    }

    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);

    //=================
    // Public Interface
    //=================
    controller.up = function(key) {
        return (!keyStates.hasOwnProperty(key) ||
            keyStates[key] === "up" ||
            keyStates[key] === "released");
    };

    controller.down = function(key) {
        return (keyStates[key] === "down" ||
            keyStates[key] === "pressed");
    };

    controller.pressed = function(key) {
        return (keyStates[key] === "pressed");
    };

    controller.released = function(key) {
        return (keyStates[key] === "released");
    };

    controller.tick = function() {
        for (var key in keyStates) {
            if (keyStates[key] === "released") {
                keyStates[key] = "up";
            }

            if (keyStates[key] === "pressed") {
                keyStates[key] = "down";
            }
        }

        for (var key in keyEvents) {
                keyStates[key] = keyEvents[key];
            }
        keyEvents = {}; //@TODO: Det här kan nog göras på ett bättre sätt
    };

    return controller;
}