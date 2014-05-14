/**
An object within the game
*/
var GameObject = function(ctx, imgPath) {

    //===========
    // Properties
    //===========
    var ownCanvas, img;

    this.imageSpeed = 1;
    this.x = 0;
    this.y = 0;

    this.width = 16; //@TODO: Change
    this.height = 16; //@TODO: Change

    this.rotation = 0;
    this.scale = {x: 1,y: 1};
    this.alpha = 1;

    this.boundingBox = {
        left: -8, right: 8,
        top: -8, bottom: 8
    };

    this.behaviors = [];
    // Lists of functions to perform at
    // the start and end of each tick:
    this.startTicks = [];
    this.endTicks = []; 
    
    console.log("@TODO: Reuse the same canvas for all sprites of the same type");
    ownCanvas = ownCanvas || document.createElement("canvas");
    ownCanvas.width = this.width;
    ownCanvas.height = this.height;
    
    img = new Image();
    img.src = imgPath;
    img.onload = function() {
        ownCanvas.getContext("2d").drawImage(img, 0, 0);
    };
    
    //=================
    // Public functions
    //=================

    /**
    Check if this object overlaps another
    */
    this.overlapsObject = function(obj) {
        return (!(this.x + this.boundingBox.left > obj.x + obj.boundingBox.right ||
            this.x + this.boundingBox.right < obj.x + obj.boundingBox.left ||
            this.y + this.boundingBox.top > obj.y + obj.boundingBox.bottom ||
            this.y + this.boundingBox.bottom < obj.y + obj.boundingBox.top));
    };

    /**
     Actions to perform at each tick
     */
     this.tickStart = function(gameState) {
        for (var i = 0; i < this.startTicks.length; i++) {
            this.startTicks[i].call(this, gameState);
        }
    };

    /**
     Actions to perform at each tick
     */
     this.tickEnd = function(gameState) {
        for (var i = 0; i < this.endTicks.length; i++) {
            this.endTicks[i].call(this, gameState);
        }
    };
    
    /**
     Render the sprite
     @param ctx The Context2d object in which to render the sprite
     */
     this.render = function() {
        var sX = 0, sY = 0;
        var sWidth = this.width, sHeight = this.height;
        var x = -this.width / 2, y = -this.height / 2;

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
        // Add the name of the behavior
        this.behaviors.push(behavior.name);
        // Add all behavior properties
        for (var p in behavior.properties) {
            this[p] = behavior.properties[p];
        }
        // Modify the target's tick functions
        this.startTicks.push(behavior.tickStart);
        this.endTicks.push(behavior.tickEnd);
    };
};