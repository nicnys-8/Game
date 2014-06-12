/**
Returns a platform character object
 */
function Guy() {	

	GameObject.call(this);


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 8, y: 8};
	var standSprite = SpriteFactory.createSprite("img/guy_walk.png", 2, hotspot);

	standSprite.imageSpeed = 0.1;
	

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
}

Guy.prototype = new GameObject();

