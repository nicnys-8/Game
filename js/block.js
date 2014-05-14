/**
 */
function createBlock(ctx) {
    var block = new GameObject(ctx, "img/block.png");
    
    /**
     Actions to perform at each tick
     
    guy.tickStart = function() {
        for (var i = 0; i < this.startTicks.length; i++) {
            this.startTicks[i].call(this);
        }
    };
    guy.tickEnd = function() {
        for (var i = 0; i < this.endTicks.length; i++) {
            this.endTicks[i].call(this);
        }
    };
*/
    return block;  
}