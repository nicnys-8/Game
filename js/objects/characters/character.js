/**
A platform character object
*/
ObjectFactory.Character = function() {

	GameObject.call(this);

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

	this.sprites = {stand: null, walk: null};

	/**
	Overwriting the tick object
	*/
	this.tick = function(gameState) {

		var threshold = 0.1;

		this.currentSprite = (Math.abs(this.hSpeed) > threshold) ? this.sprites.walk : this.sprites.stand;

		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};

};

ObjectFactory.Character.prototype = new GameObject();


