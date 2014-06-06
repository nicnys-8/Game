/**
Describes the behavior of a solid object
 */
var Solid = function() {

	//================================
	// Private functions and variables
	//================================

	/*
	function move(deltaX, deltY) {
		this.x += this.hSpeed;
		this.y += this.vSpeed;
	}
	*/
	

	//=================
	// Public interface
	//=================

	var behavior = {};
	
	behavior.name = "Solid";

	behavior.getProperties = function() {
		return {};
	};
	
	
	//=======================
	// Behavior tick function
	//=======================
	behavior.tick = function(gameState) {};

	return behavior;
}();

//@TODO: Ta bort hela de tomma funktionerna helt?