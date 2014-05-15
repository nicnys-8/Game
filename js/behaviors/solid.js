/**
Describes the behavior of a solid object
 */
var Solid = function() {
    var behavior = {};
    //================================
    // Private functions and variables
    //================================

    /*
    function move(deltaX, deltY) {
        this.x += this.hSpeed;
        this.y += this.vSpeed;
    }
    */

    //====================
    // Behavior properties
    //====================
    behavior.name = "Solid";

    behavior.properties = {
        /*
        hAcceleration: 0,
        vAcceleration: 0,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7,

        move: move
        */
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {};

    return behavior;
}();
