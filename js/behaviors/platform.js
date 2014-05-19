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
    
    //========================
    // Behavior tick functions
    //========================
    this.tickStart = function(gameState) {};
    this.tickEnd = function(gameState) {
    };

}