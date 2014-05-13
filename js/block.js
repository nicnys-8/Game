/**
 */
function createBlock(ctx) {
    var block = new GameObject(ctx, "img/block.png");
    
    /**
     Actions to perform at each tick
     */
    block.tickEnd = function() {
        for (var i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].call(this);
        }
        this.render();
    };

    return block;  
}