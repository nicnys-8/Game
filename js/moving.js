/**
 */
function Moving() {
    
    //==================
    // Private functions
    //==================

    //====================
    // Behavior properties
    //====================
    this.properties = {
        
        hAcceleration: 0,
        vAcceleration: 0,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 7,
        maxVSpeed: 7
    };
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function() {
        
        this.hSpeed += this.hAcceleration;
        this.vSpeed += this.vAcceleration;
        
        this.x += this.hSpeed;
        this.y += this.vSpeed;
    };
};