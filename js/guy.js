/**
 */
var Guy = function(ctx) {
    Sprite.call(this, ctx, "img/guy.png");
    
    //================================
    // Private functions and variables
    //================================
    
    //====================
    // Behavior properties
    //====================
    this.addBehavior(new Gravity());
    this.addBehavior(new Platform());
    
    //=======================
    // Behavior tick function
    //=======================
    this.tick = function() {
        for (var i = 0; i < this.behaviors.length; i++) {
            this.behaviors[i].call(this);
        }
        this.render();
    };
    
};

Block.prototype = Object.create(Sprite.prototype);
