/**
Behavior describing a platform character
 */
var Platform = function() {

	//================================
	// Private functions and variables
	//================================
	
	function jump() {
		this.vSpeed = -5;
	};
	

	//=================
	// Public interface
	//=================

	var behavior = {};

	behavior.name = "Platform";

	behavior.getProperties = function() {
		return {
			jump: jump
		};
	};
	
	behavior.tick = function(gameState) {};
	
	return behavior;
}();