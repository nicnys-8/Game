/**
A platform character object
*/
ObjectFactory.Boba = function() {

	GameObject.call(this);

	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 8, y: 24};
	var standSprite = SpriteFactory.createSprite("img/sprites/boba/stand.svg", 1, hotspot);
	var walkSprite = SpriteFactory.createSprite("img/sprites/boba/walk.svg", 2, hotspot);

	standSprite.imageSpeed = 0;
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
		top: -24, bottom: 24
	};
	
}

ObjectFactory.Boba.prototype = new GameObject();


