/**
An in-game object
*/
GameObject = function() {

	//===================
	// Instance variables
	//===================

	this.behaviors = {}; // [];
	this.ticks = [];
	this.uid; // This is set in GameState, when the level is parsed
};

//=================
// Public functions
//=================

/**
Returns true if the object has the given behavior, false otherwise
*/
GameObject.prototype.hasBehavior = function(behavior) {
    return !!this.behaviors[behavior];
    /*
	for (var i = 0; i < this.behaviors.length; i++) {
		if (behavior === this.behaviors[i]) {
			return true;
		}
	}
	return false;
     */
};

/**
Adds a behavior to the sprite object
*/
GameObject.prototype.addBehavior = function(behavior) {
    
    if (typeof behavior === "function") {
        // Subclasses can add custom behavior with functions
        this.ticks.push(behavior);
        return;
    }
    
    var properties = behavior.getProperties();

    // Add all behavior properties
    for (var p in properties) {
        this[p] = properties[p];
    }

    // Add the name of the behavior
    this.behaviors[behavior.name] = true; // .push(behavior.name);
    
    // Modify the target's tick function
    if (behavior.tick) {
        this.ticks.push(behavior.tick);
    }
};

/**
Actions to perform at each iteration of the game loop
*/
GameObject.prototype.tick = function(gameState) {
	for (var i = 0; i < this.ticks.length; i++) {
		this.ticks[i].call(this, gameState);
	}
};

