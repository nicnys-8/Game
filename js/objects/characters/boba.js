/**
A platform character object
*/
ObjectFactory.Boba = function() {

	ObjectFactory.Character.call(this);


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 8, y: 16};


	//=================
	// Public interface
	//=================

	this.boundingBox = {
		left: -8, right: 8,
		top: -16, bottom: 16
	};

	this.sprites.stand = SpriteFactory.createSprite("img/sprites/boba/stand.svg", 1, hotspot);
	this.sprites.walk = SpriteFactory.createSprite("img/sprites/boba/walk.svg", 2, hotspot);
	this.sprites.walk.imageSpeed = 0.1;
	this.currentSprite = this.sprites.stand;
	
}

ObjectFactory.Boba.prototype = new ObjectFactory.Character();


