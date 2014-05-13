/**
 */
var Moving = function() {
    var behavior = {};
    //================================
    // Private functions and variables
    //================================

    //====================
    // Behavior properties
    //====================
    behavior.properties = {
        hAcceleration: 0,
        vAcceleration: 0,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function() {};
    behavior.tickEnd = function() {

        this.hSpeed += this.hAcceleration;
        this.vSpeed += this.vAcceleration;
        
        this.x += this.hSpeed;
        this.y += this.vSpeed;

        // Limit the maximum speed
        if ((this.hSpeed) > this.maxHSpeed) {
            this.hSpeed = this.maxHSpeed;
        } else if ((this.hSpeed) < -this.maxHSpeed) {
            this.hSpeed = -this.maxHSpeed;
        }

        if ((this.vSpeed) > this.maxVSpeed) {
            this.vSpeed = this.maxVSpeed;
        } else if ((this.vSpeed) < -this.maxVSpeed) {
            this.vSpeed = -this.maxVSpeed;
        }
    };

    return behavior;
}();