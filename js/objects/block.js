/**
A solid block object
 */
ObjectFactory.Block = function(width, height) {

	GameObject.call(this);

	
	//================================
	// Private functions and variables
	//================================

	// Set values for width and height
	if (typeof(width) === "undefined") {
		width = 16;
	}
	if (typeof(height) === "undefined") {
		height = 16;
	}

	var hotspot = {x: width / 2, y: height / 2};
	

	//==============
	// Add behaviors
	//==============
	
	this.addBehavior(Behavior.Renderable);
	this.addBehavior(Behavior.Physical);
	this.addBehavior(Behavior.Solid);


	//=================
	// Public interface
	//=================

	this.currentSprite = SpriteFactory.createSprite("img/sprites/block.svg", 1, hotspot);
	this.boundingBox = {
		left: -width / 2, right: width / 2,
		top: -height / 2, bottom: height/ 2
	};
}

ObjectFactory.Block.prototype = new GameObject();

