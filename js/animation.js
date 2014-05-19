/**
A animation that can be rendered on screen
*/
function createAnimation(imgPath, numFrames, hotspot) {
    var animation = {};

    //==================
    // Private variables
    //==================
    var img, width, height;

    animation.frame = 0;
    animation.numFrames = numFrames;
    animation.hotspot = hotspot;
    animation.imageSpeed = 0;

    //=================
    // Public functions
    //=================
    animation.tick = function() {
        animation.frame = (animation.frame + animation.imageSpeed) % (animation.numFrames - 1);
    };

    animation.render = function(ctx, x, y, scale, rotation, alpha) {
        var clippingX = Math.round(animation.frame) * width, clippingY = 0,
        clippingWidth = width, clippingHeight = height,
        canvasX = -this.hotspot.x, canvasY = -this.hotspot.y;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale.x, scale.y);
        ctx.rotate(rotation);
        ctx.globalAlpha = alpha; 
        ctx.drawImage(
            animation.canvas,
            clippingX, clippingY,
            clippingWidth, clippingHeight,
            canvasX, canvasY,
            width, height
            );
        ctx.restore();
    };

    //===============
    // Initialization
    //===============
    animation.canvas = document.createElement("canvas");
    img = new Image();
    img.src = imgPath;
    img.onload = function() {
        width = img.width / animation.numFrames;
        height = img.height;

        animation.canvas.width = img.width;
        animation.canvas.height = img.height;
        animation.canvas.getContext("2d").drawImage(img, 0, 0);
    };

    return animation;
}