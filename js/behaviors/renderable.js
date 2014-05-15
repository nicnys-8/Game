
/**
Describes the behavior of a renderable object
@param imgPath The path to the image file to use for the sprite
*/
var Renderable = function() {
    var behavior = {};

    //================================
    // Private functions and variables
    //================================

    /**
     Render the sprite
     @param ctx The Context2d object in which to render the sprite
     */
     function render() {
        this.sprite.render(ctx, this.x, this.y, this.scale, this.rotation, this.alpha);
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
        sprite: null,
        imageSpeed: 1,
        rotation: 0,
        scale: {x: 1, y: 1},
        alpha: 1
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {
        this.render();
    };

    return behavior;
}();
