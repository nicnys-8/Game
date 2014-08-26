/**
Behavior describing a platform character
 */
Behavior.Platform = Behavior.Platform || function() {

	//================================
	// Private functions and variables
	//================================

	var jumpSound = AudioFactory.createSound("audio/jump.wav");
	
	function jump() {
		this.vSpeed = -5;
		jumpSound.play();
	}

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
		
	return behavior;
}();