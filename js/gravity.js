/**
 */
function Gravity() {
    
    //==================
    // Private functions
    //==================
    
    //====================
    // Behavior properties
    //====================
    this.properties = {
        gravity: 0.1,
        vSpeed: 0,
        maxVspeed: 7
    };
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function() {
        if (this.vSpeed < this.maxVspeed) {
            this.vSpeed += this.gravity;
        }
        this.y += this.vSpeed;
    };
};