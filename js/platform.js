/**
 */
function Platform() {
    
    //==================
    // Private functions
    //==================
    function jump() {
        this.vSpeed = -3;
    };
    
    //====================
    // Behavior properties
    //====================
    this.properties = {
        gravity: 0.1,
        vSpeed: 0,
        maxVspeed: 7,
        jump: jump
    };
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function() {
        
        if (this.y >= 70) this.y = 70;
    };
};