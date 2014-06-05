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
    guy.addBehavior(new Renderable());
    guy.addBehavior(new Physical());
    guy.addBehavior(new Moving());
    guy.addBehavior(new Platform());
    guy.addBehavior(new FaceDirection());
    guy.addBehavior(new Solid());
    guy.currentAnimation = createAnimation("img/guy_walk.png", 2, hotspot);
    guy.currentAnimation.imageSpeed = 0.1;

    guy.boundingBox = {
        left: -8, right: 8,
        top: -8, bottom: 8
    };

    //==============
    // Tick function
    //==============
    guy.tick = function(gameState) {
        for (var i = 0; i < this.ticks.length; i++) {
            this.ticks[i].call(this, gameState);
        }
    };

    return guy;   
}
