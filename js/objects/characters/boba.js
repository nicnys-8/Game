/**
A platform character object
*/
ObjectFactory.Boba = function() {

	ObjectFactory.Character.call(this);


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 16, y: 32};


	//=================
	// Public interface
	//=================

	this.boundingBox = {
		left: -16, right: 16,
		top: -32, bottom: 32
	};

	this.sprites.stand = SpriteFactory.createSprite("img/sprites/boba/stand.svg", 1, hotspot);
	this.sprites.walk = SpriteFactory.createSprite("img/sprites/boba/walk.svg", 2, hotspot);
	this.sprites.walk.imageSpeed = 0.1;
	this.currentSprite = this.sprites.stand;
	
}

ObjectFactory.Boba.prototype = new ObjectFactory.Character();


