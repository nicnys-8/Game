/**
 */
function createSquare() {
    var square = new GameObject();
    
    //================================
    // Private functions and variables
    //================================
    var hotspot = {x: 16, y: 16};

    //==============
    // Add behaviors
    //==============
    square.addBehavior(Renderable);
    square.addBehavior(Moving);
    square.addBehavior(Platform);
    square.currentAnimation = createAnimation("img/square.png", 1, hotspot);
    square.currentAnimation.imageSpeed = 0;
    square.boundingBox = {
        left: -16, right: 16,
        top: -16, bottom: 16
    };

    //===============
    // Tick functions
    //===============
    square.tickEnd = function() {
        for (var i = 0; i < this.endTicks.length; i++) {
            this.endTicks[i].call(this, gameState);
        }
    };

    return square;   
}
