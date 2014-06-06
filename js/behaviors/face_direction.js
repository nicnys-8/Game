/**
This behavior makes an object face the direction in which it is moving
 */
var FaceDirection = function() {

	//================================
	// Private functions and variables
	//================================
	

	//=================
	// Public interface
	//=================
	
	var behavior = {};
	
	behavior.name = "FaceDirection";

	behavior.getProperties = function() {
		return {};
	};
	
	behavior.tick = function(gameState) {
		if (this.hSpeed > 0) {
			this.scale.x = 1;
		} else if (this.hSpeed < 0) {
			this.scale.x = -1;
		}
	};

	return behavior;
}();
