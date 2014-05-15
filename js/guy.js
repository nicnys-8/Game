/**
 */
function createGuy(ctx) {
    var guy = new GameObject(ctx);
    
    //================================
    // Private functions and variables
    //================================

    //==============
    // Add behaviors
    //==============
    guy.addBehavior(Renderable);
    guy.addBehavior(Moving);
    guy.addBehavior(Platform);
    guy.addBehavior(FaceDirection);
    guy.vAcceleration = 0.4;
    guy.currentAnimation = createAnimation("img/guy_walk.png", 2);
    guy.currentAnimation.imageSpeed = 0.1;

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
