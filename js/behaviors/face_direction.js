/**
This behavior makes an object face the direction in which it is moving
 */
var FaceDirection = function() {
    var behavior = {};
    //================================
    // Private functions and variables
    //================================
    
    //====================
    // Behavior properties
    //====================
    behavior.name = "FaceDirection";

    behavior.properties = {};
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {
        if (this.hSpeed > 0) {
        }
    };
    return behavior;
}();
