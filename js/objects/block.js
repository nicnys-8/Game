/**
Returns a solid block object
 */
function createBlock(width, height) {

	var block = new GameObject();

	// Set values for width and height
	if (typeof(width) === "undefined") {
		width = 16;
	}
	if (typeof(height) === "undefined") {
		height = 16;
	}


	//================================
	// Private functions and variables
	//================================

	var hotspot = {x: width / 2, y: height / 2};
	

	//==============
	// Add behaviors
	//==============
	
	block.addBehavior(Behavior.Renderable);
	block.addBehavior(Behavior.Physical);
	block.addBehavior(Behavior.Solid);
	block.currentSprite = SpriteFactory.createSprite("img/block.png", 1, hotspot);
	block.boundingBox = {
		left: -width / 2, right: width / 2,
		top: -height / 2, bottom: height/ 2
	};


	return block;  
}