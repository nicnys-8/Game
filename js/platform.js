/**
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
    behavior.properties = {
        jump: jump
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function() {};
    behavior.tickEnd = function() {
        if (this.y >= 70) this.y = 70;
    };

    return behavior;
}();