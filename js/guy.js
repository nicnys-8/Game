/**
 */
function createGuy() {
    var guy = new GameObject(ctx);
    
    //================================
    // Private functions and variables
    //================================
    var hotspot = {x: 8, y: 8};

    //==============
    // Add behaviors
    //==============
    guy.addBehavior(Renderable);
    guy.addBehavior(Moving);
    guy.addBehavior(Platform);
    guy.addBehavior(FaceDirection);
    guy.currentAnimation = createAnimation("img/guy_walk.png", 2, hotspot);
    guy.currentAnimation.imageSpeed = 0.1;

    guy.boundingBox = {
        left: -8, right: 8,
        top: -8, bottom: 8
    };

    //===============
    // Tick functions
    //===============
    guy.tickEnd = function() {
        for (var i = 0; i < this.endTicks.length; i++) {
            this.endTicks[i].call(this, gameState);
        }
    };

    return guy;   
}
