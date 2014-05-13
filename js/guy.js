/**
 */
function createGuy(ctx) {
    var guy = new GameObject(ctx, "img/guy.png");
    
    //================================
    // Private functions and variables
    //================================

    //====================
    // Behavior properties
    //====================
    guy.addBehavior(Moving);
    guy.addBehavior(Platform);
    guy.vAcceleration = 0.4;
    
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
