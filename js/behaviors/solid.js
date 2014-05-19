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

    behavior.properties = {};
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {};

    return behavior;
}();
