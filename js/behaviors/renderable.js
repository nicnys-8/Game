
/**
Describes an object that can be rendered on the screen
*/
var Renderable = function() {
    var behavior = {};

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
    behavior.name = "Renderable";

    behavior.properties = {
        render: render,
        currentAnimation: null,
        frame: 0,
        rotation: 0,
        scale: {x: 1, y: 1},
        alpha: 1
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {
        if (this.currentAnimation.imageSpeed > 0) {
            this.currentAnimation.tick();
        }
    };

    return behavior;
}();
