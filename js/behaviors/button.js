/**
Describes the behavior of a solid object
 */
Behavior.Button = Behavior.Button || function() {

	//================================
	// Private functions and variables
	//================================

	/**
	A list of functions to execute when the button is toggled
	*/
	var callbacks = [];

	/**
	Specifies a function to be executed when the button is toggled
	@param func The function to call
	*/
	function addCallback(func) {
		callbacks.push(func);
	}

	/**
	Toggles between on and off and alerts all listeners
	*/
	function toggle() {
		this.isPushed = !this.isPushed;

		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i](this.isPushed);
		}
	}

	/**
	Switches the button from on to off and alerts all listeners
	*/
	function press() {
		if (!this.isPushed) {
			this.toggle();
		}
	}

	/**
	Switches the button from off to on and alerts all listeners
	*/
	function release() {
		if (this.isPushed) {
			this.toggle();
		}
	}
	

	//=================
	// Public interface
	//=================

	var behavior = {};
	
	behavior.name = "Button";

	behavior.getProperties = function() {
		return {
			// Variables
			isPushed: false,

			// Functions
			addCallback: addCallback,
			toggle: toggle,
			press: press,
			release: release
		};
	};

	return behavior;
}();
