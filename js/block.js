/**
A solid block
 */
function createBlock(ctx) {
	var block = new GameObject(ctx);

	//================================
	// Private functions and variables
	//================================
	var hotspot = {x: 8, y: 8};
	
	//==============
	// Add behaviors
	//==============
	block.addBehavior(Renderable);
	block.addBehavior(Physical);
	block.addBehavior(Solid);
	block.currentAnimation = createAnimation("img/block.png", 1, hotspot);
	block.boundingBox = {
		left: -8, right: 8,
		top: -8, bottom: 8
	};


	return block;  
}