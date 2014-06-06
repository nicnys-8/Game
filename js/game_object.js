/**
An object within the game
*/
var GameObject = function() {

	//===========
	// Properties
	//===========

	this.behaviors = [];
	this.ticks = [];
	

	//=================
	// Public functions
	//=================

	this.hasBehavior = function(behavior) {
		for (var i = 0; i < this.behaviors.length; i++) {
			if (behavior === this.behaviors[i]) {
				return true;
			}
		}
		return false;
	};

	/**
	 Actions to perform at each tick
	 */
	 this.tick = function(gameState) {
		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};
	
	/**
	 Adds a behavior to the sprite object
	 */
	 this.addBehavior = function(behavior) {
		var properties = behavior.getProperties();

		// Add all behavior properties
		for (var p in properties) {
			this[p] = properties[p];
		}

		// Add the name of the behavior
		this.behaviors.push(behavior.name);
		
		// Modify the target's tick function
		this.ticks.push(behavior.tick);
	};
};