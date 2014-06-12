/**
Returns a solid block object
 */
function createButton() {

	var button = new GameObject();
	skam = button;


	//================================
	// Private functions and variables
	//================================

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

	button.addBehavior(Behavior.Renderable);
	button.addBehavior(Behavior.Physical);
	button.addBehavior(Behavior.Solid);
	button.addBehavior(Behavior.Button);

	button.addCallback(function(a) {
		button.currentSprite = pushedSprite;
		button.boundingBox = smallBBox;
	});

	button.currentSprite = standardSprite;
	button.boundingBox = {
		left: -8, right: 8,
		top: -8, bottom: 8
	};


	//==============
	// Tick function
	//==============

	/**
	 Actions to perform at each iteration of the game loop
	 */
	button.tick = function(gameState) {
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


	return button;  
}