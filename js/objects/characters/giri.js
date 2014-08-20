/**
A platform character object
*/
ObjectFactory.Giri = function() {

	ObjectFactory.Character.call(this);


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 16, y: 16};


	//=================
	// Public interface
	//=================

	this.boundingBox = {
		left: -16, right: 16,
		top: -16, bottom: 16
	};

	this.sprites.stand = SpriteFactory.createSprite("img/sprites/giri/stand.svg", 1, hotspot);
	this.sprites.walk = SpriteFactory.createSprite("img/sprites/giri/walk.svg", 2, hotspot);
	this.sprites.walk.imageSpeed = 0.1;
	this.currentSprite = this.sprites.stand;

}

ObjectFactory.Giri.prototype = new ObjectFactory.Character();


