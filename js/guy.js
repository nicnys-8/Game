/**
 */
function createGuy(ctx) {
    var guy = new GameObject(ctx, "img/guy.png");
    
    //================================
    // Private functions and variables
    //================================

    //==============
    // Add behaviors
    //==============
    guy.addBehavior(Renderable);
    guy.addBehavior(Moving);
    guy.addBehavior(Platform);
    guy.vAcceleration = 0.4;

    guy.setImage("img/guy.png");
    
    //========================
    // Behavior tick functions
    //========================
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

    return guy;   
}
