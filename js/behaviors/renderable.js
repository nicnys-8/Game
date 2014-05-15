
/**
...
*/
var Renderable = function() {
    var behavior = {};

    //================================
    // Private functions and variables
    //================================

    /**
     Render the object
     @param ctx The Context2d object in which to render the object
     */
     behavior.haxx = 0;

     function render() {
        this.currentAnimation.render(ctx, this.x, this.y, this.scale, this.rotation, this.alpha);
    };

    /**
    Set image
    */
    function setImage(imgPath) {
        img.src = imgPath;
        img.onload = function() {
            ownCanvas.getContext("2d").drawImage(img, 0, 0);
        };
    }

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
        this.render();
        /*
        this.frame = (this.frame + this.imageSpeed) % (this.animation.numFrames - 1);
        this.render(Math.round(this.frame));
        */

    };

    return behavior;
}();
