
/**
Describes an object that can be rendered on the screen
*/
function Renderable() {
    //================================
    // Private functions and variables
    //================================

    /**
     Render the object
     */
     function render(ctx) {
        this.currentAnimation.render(ctx, this.x, this.y, this.scale, this.rotation, this.alpha);
    };

    //====================
    // Behavior properties
    //====================
    this.name = "Renderable";

    this.properties = {
        render: render,
        currentAnimation: null,
        frame: 0,
        rotation: 0,
        scale: {x: 1, y: 1},
        alpha: 1
    };
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function(gameState) {
        if (this.currentAnimation.imageSpeed > 0) {
            this.currentAnimation.tick();
        }
    };
}
