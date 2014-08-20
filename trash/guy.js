/**
Returns a platform character object
*/
ObjectFactory.Guy = function() {	

	GameObject.call(this);


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 8, y: 8};
	var standSprite = SpriteFactory.createSprite("img/sprites/guy.png", 1, hotspot);
	var walkSprite = SpriteFactory.createSprite("img/sprites/guy_walk.png", 2, hotspot);

	walkSprite.imageSpeed = 0.1;
	

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

	this.currentSprite = standSprite;
	this.boundingBox = {
		left: -8, right: 8,
		top: -8, bottom: 8
	};

	/**
	Overwriting the tick object
	*/
	this.tick = function(gameState) {
		var walkThreshold = 0.1;
		if (Math.abs(this.hSpeed) > walkThreshold) {
			this.currentSprite = walkSprite;
		} else {
			this.currentSprite = standSprite;
		}

		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};
}

ObjectFactory.Guy.prototype = new GameObject();

