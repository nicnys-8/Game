/**
 */
var Sprite = function(ctx, imgPath) {

    //================================
    // Private functions and variables
    //================================
    this.imageSpeed = 1;
    this.x = 0;
    this.y = 0;
    this.width = 16; //@TODO: Change
    this.height = 17; //@TODO: Change
    this.rotation = 0;
    this.scale = {x: 1, y: 1};
    this.alpha = 1;
    this.boundingBox = {left: -4, right: 4, top: -8, bottom: 8};
    this.behaviors = []; // a list of functions to perform each tick
    
    var img = new Image();
    Sprite.ownCanvas = document.createElement("canvas");
    
    Sprite.ownCanvas.width = this.width;
    Sprite.ownCanvas.height = this.height;
    
    img.src = imgPath;
    img.onload = function() {
        ownCanvas.getContext("2d").drawImage(img, 0, 0);
    };
    
    /**
     Actions to perform at each tick
     */
    this.tick = function() {
        console.log(x);
        for (var i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].call(this);
        }
    };
    
    
    /**
     Render the sprite
     @param ctx The Context2d object in which to render the sprite
     */
    this.render = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale.x, this.scale.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.alpha;
        
        // I declare these here to make it easier to understand which argument is which...
        var sX = 0, sY = 0;
        var sWidth = this.width, sHeight = this.height;
        var x = -this.width / 2, y = -this.height / 2;
        
        ctx.drawImage(
            Sprite.ownCanvas,
            sX, sY,
            sWidth, sHeight,
            x, y,
            this.width, this.height
            );
        ctx.restore();
        ctx.save();
        ctx.restore();
    };
    
    
    /**
     Adds a behavior to the sprite object
     */
    this.addBehavior = function(behavior) {
        // Add all behavior properties
        for (var p in behavior.properties) {
            this[p] = behavior.properties[p];
        }
        // Modify the target's tick
        this.behaviors.push(behavior.tick);
    };
};