/**
A animation that can be rendered on screen
*/
function createBackground(imgPath) {
    var background = {};

    //==================
    // Private variables
    //==================
    var img, width, height;

    //=================
    // Public functions
    //=================
    animation.tick = function() {};

    animation.render = function(ctx, x, y, scale, rotation, alpha) {
        var clippingX = 0, clippingY = 0;
        ctx.save();

        ctx.translate(x, y);
        ctx.scale(scale.x, scale.y);
        ctx.rotate(rotation);
        ctx.globalAlpha = alpha;

        ctx.drawImage(animation.canvas, 0, 0);
        ctx.restore();
    };

    //===============
    // Initialization
    //===============
    animation.canvas = document.createElement("canvas");
    img = new Image();
    img.src = imgPath;
    img.onload = function() {
        width = img.width;
        height = img.height;

        animation.canvas.width = img.width;
        animation.canvas.height = img.height;
        animation.canvas.getContext("2d").drawImage(img, 0, 0);
        //animation.canvas.getContext("2d").drawImage(img, 0, 0, width, height, 0, 0, width * 4, width * 4);
    };

    return animation;
}