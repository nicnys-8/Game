
/**
Describes the behavior of a moving object
@param imgPath The path to the image file to use for the sprite
*/
var Renderable = function() {
    var behavior = {};

    //================================
    // Private functions and variables
    //================================
    var ownCanvas, img, width = 16, height = 16;

    console.log("@TODO: Reuse the same canvas for all sprites of the same type");
    ownCanvas = ownCanvas || document.createElement("canvas");
    console.log("@TODO: Make width and height variable.");
    ownCanvas.width = width;
    ownCanvas.height = height;
    img = new Image();

    /**
     Render the sprite
     @param ctx The Context2d object in which to render the sprite
     */
     function render() {
        var sX = 0, sY = 0,
        sWidth = width, sHeight = height,
        x = -width / 2, y = -height / 2;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.alpha;        

        ctx.drawImage(
            ownCanvas,
            sX, sY,
            sWidth, sHeight,
            x, y,
            width, height
            );
        ctx.restore();
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
    behavior.name = "sprite";

    behavior.properties = {
        setImage: setImage,
        render: render,

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
