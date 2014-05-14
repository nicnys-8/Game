skam = true;
/**
A sprite that can be rendered on screen
*/
function createSprite(imgPath) {
    var sprite = {};
    var img, width = 16, height = 16;

    sprite.canvas = document.createElement("canvas");
    sprite.canvas.width = width;
    sprite.canvas.height = height;
    
    img = new Image();
    img.src = imgPath;
    img.onload = function() {
        sprite.canvas.getContext("2d").drawImage(img, 0, 0);
    };

    sprite.render = function(ctx, x, y, scale, rotation, alpha) {
        if (skam) {
            skam = false;
        }
        var sX = 0, sY = 0,
        sWidth = width, sHeight = height,
        cornerX = -width / 2, cornerY = -height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale.x, scale.y);
        ctx.rotate(rotation);
        ctx.globalAlpha = alpha;        
        ctx.drawImage(
            sprite.canvas,
            sX, sY,
            sWidth, sHeight,
            cornerX, cornerY,
            width, height
            );
        ctx.restore();
    };

    return sprite;
}