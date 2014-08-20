/**
Returns a platform character object
*/
ObjectFactory.Niri = function() {

	ObjectFactory.Character.call(this);	


	//================================
	// Private functions and variables
	//================================

	var stdHotspot = {x: 16, y: 8};


	//=================
	// Public interface
	//=================
	
	this.boundingBox = {
		left: -16, right: 16,
		top: -8, bottom: 8
	};

	this.sprites.stand = SpriteFactory.createSprite("img/sprites/niri/stand.svg", 1, stdHotspot);
	this.sprites.walk = SpriteFactory.createSprite("img/sprites/niri/walk.svg", 2, stdHotspot);
	this.sprites.walk.imageSpeed = 0.1;
	this.currentSprite = this.sprites.stand;

};

ObjectFactory.Niri.prototype = new ObjectFactory.Character();

