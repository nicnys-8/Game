/**
Returns a platform character object
*/
ObjectFactory.Niri = function() {

	ObjectFactory.Character.call(this);	


	//================================
	// Private functions and variables
	//================================

	var stdHotspot = {x: 32, y: 16};


	//=================
	// Public interface
	//=================
	
	this.boundingBox = {
		left: -32, right: 32,
		top: -16, bottom: 16
	};

	this.sprites.stand = SpriteFactory.createSprite("img/sprites/niri/stand.svg", 1, stdHotspot);
	this.sprites.walk = SpriteFactory.createSprite("img/sprites/niri/walk.svg", 2, stdHotspot);
	this.sprites.walk.imageSpeed = 0.1;
	this.currentSprite = this.sprites.stand;

};

ObjectFactory.Niri.prototype = new ObjectFactory.Character();

