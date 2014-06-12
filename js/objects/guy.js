/**
Returns a platform character object
 */
function createGuy() {
	var guy = new GameObject();
	

	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: 8, y: 8};
	

	//==============
	// Add behaviors
	//==============
	
	guy.addBehavior(Renderable);
	guy.addBehavior(Physical);
	guy.addBehavior(Moving);
	guy.addBehavior(Platform);
	guy.addBehavior(FaceDirection);
	guy.addBehavior(Solid);
	guy.currentSprite = SpriteFactory.createSprite("img/guy_walk.png", 2, hotspot);
	guy.currentSprite.imageSpeed = 0.1;

	guy.boundingBox = {
		left: -8, right: 8,
		top: -8, bottom: 8
	};


	//==============
	// Tick function
	//==============

	/**
	 Actions to perform at each iteration of the game loop
	 */
	guy.tick = function(gameState) {
		for (var i = 0; i < this.ticks.length; i++) {
			this.ticks[i].call(this, gameState);
		}
	};

	return guy;   
}
