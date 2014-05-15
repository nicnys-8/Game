/**
Behavior describing a platform character
 */
var Platform = function() {
    var behavior = {};
    //==================
    // Private functions
    //==================
    function jump() {
        this.vSpeed = -5;
    };
    
    //====================
    // Behavior properties
    //====================
    behavior.name = "Platform";

    behavior.properties = {
        jump: jump
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {
    };

    return behavior;
}();