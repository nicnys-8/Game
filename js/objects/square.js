/**
Returns a platform character object
 */
function createSquare() {
	var square = new GameObject();
	

	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 16, y: 16};
	var standSprite = SpriteFactory.createSprite("img/pink-stand.svg", 1, hotspot);
	var walkSprite = SpriteFactory.createSprite("img/pink-walk.svg", 2, hotspot);

	standSprite.imageSpeed = 0;
	walkSprite.imageSpeed = 0.1;


	//==============
	// Add behaviors
	//==============

	square.addBehavior(Renderable);
	square.addBehavior(FaceDirection);
	square.addBehavior(Physical);
	square.addBehavior(Moving);
	square.addBehavior(Platform);
	square.addBehavior(Solid);
	square.currentSprite = walkSprite;
	square.boundingBox = {
		left: -16, right: 16,
		top: -16, bottom: 16
	};


	//===============
	// Tick functions
	//===============

	/**
	 Actions to perform at each iteration of the game loop
	 */
	square.tick = function(gameState) {
		var threshold = 0.1; //@TODO: Gör det här på nå annat sätt
		if (Math.abs(this.hSpeed) > threshold) {
			this.currentSprite = walkSprite;
		} else {
			this.currentSprite = standSprite;
		};

		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};

	return square;   
}
