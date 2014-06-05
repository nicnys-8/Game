/**
This behavior makes an object face the direction in which it is moving
 */
function FaceDirection() {

    //================================
    // Private functions and variables
    //================================
    
    //====================
    // Behavior properties
    //====================
    this.name = "FaceDirection";

    this.properties = {};
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function(gameState) {
        if (this.hSpeed > 0) {
            this.scale.x = 1;
        } else if (this.hSpeed < 0) {
            this.scale.x = -1;
        }
    };
}
