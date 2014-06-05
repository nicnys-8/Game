/**
Behavior describing a platform character
 */
function Platform() {
    //==================
    // Private functions
    //==================
    function jump() {
        this.vSpeed = -5;
    };
    
    //====================
    // Behavior properties
    //====================
    this.name = "Platform";

    this.properties = {
        jump: jump
    };
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function(gameState) {
    };

}