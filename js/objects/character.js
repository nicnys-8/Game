
/**
A platform character object
*/
ObjectFactory.Character = function(args) {

	GameObject.call(this, args);

	//================================
	// Private functions and variables
	//================================


	//==============
	// Add behaviors
	//==============

	this.addBehavior(Behavior.Renderable);
	this.addBehavior(Behavior.Physical);
	this.addBehavior(Behavior.Solid);
	this.addBehavior(Behavior.Moving);
	this.addBehavior(Behavior.Platform);
	this.addBehavior(Behavior.FaceDirection);


	//=================
	// Public interface
	//=================

	/**
	Overwriting the tick object
	*/
	this.tick = function(gameState) {
		var threshold = 0.1;
		console.log("Tick");

		if (Math.abs(this.hSpeed) > threshold) {
			this.currentSprite = this.walkSprite;
		} else {
			this.currentSprite 0 this.standSprite;
		}

		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};
	
}

ObjectFactory.Character.prototype = new GameObject();


