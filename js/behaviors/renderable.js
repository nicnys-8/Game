
/**
Describes an object that can be rendered on the screen
*/
var Renderable = function() {

	//================================
	// Private functions and variables
	//================================

	/**
	 Render the object
	 */
	 function render(ctx) {
		this.currentAnimation.render(ctx, this.x, this.y, this.scale, this.rotation, this.alpha);
	};


	//=================
	// Public interface
	//=================

	var behavior = {};

	behavior.name = "Renderable";

	behavior.getProperties = function() {
		return {
			// Variables
			currentAnimation: null,
			frame: 0,
			rotation: 0,
			scale: {x: 1, y: 1},
			alpha: 1,

			// Functions
			render: render
		}
	};
	
	behavior.tick = function(gameState) {
		if (this.currentAnimation.imageSpeed > 0) {
			this.currentAnimation.tick();
		}
	};

	return behavior;
}();
