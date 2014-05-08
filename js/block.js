/**
 */
var Block = function(ctx) {
    Sprite.call(this, ctx, "img/block.png");
    
    /**
     Actions to perform at each tick
     */
    this.tick = function() {
        for (var i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].call(this);
        }
        this.render();
    };
    
};

Block.prototype = Object.create(Sprite.prototype);
