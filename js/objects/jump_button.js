/**
Returns a solid block object
*/
function JumpButton() {

	GameObject.call(this);
	

	//================================
	// Private functions and variables
	//================================

	var self = this;

	var hotspotA = {x: 8, y: 8};
	var hotspotB = {x: 8, y: 0};
	var standardSprite = SpriteFactory.createSprite("img/button.svg", 1, hotspotA);
	var pushedSprite = SpriteFactory.createSprite("img/button_pushed.svg", 1, hotspotB);

	var smallBBox = {
		left: -8, right: 8,
		top: 0, bottom: 8
	};


	//==============
	// Add behaviors
	//==============

	this.addBehavior(Behavior.Renderable);
	this.addBehavior(Behavior.Physical);
	this.addBehavior(Behavior.Solid);
	this.addBehavior(Behavior.Button);


	//=================
	// Public interface
	//=================

	this.currentSprite = standardSprite;
	this.boundingBox = {
		left: -8, right: 8,
		top: -8, bottom: 8
	};

	this.addCallback(function(a) {
		self.currentSprite = pushedSprite;
		self.boundingBox = smallBBox;
	});

	/**
	Actions to perform at each iteration of the game loop
	*/
	this.tick = function(gameState) {
		var moving = gameState.filter("Moving");
		var obj;
		for (var i = 0; i < moving.length; i++) {
			if (moving[i].carriedBy(this)) {
				this.press();
			}
		}

		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};
}

JumpButton.prototype = new GameObject();

