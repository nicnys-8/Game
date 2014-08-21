/**
Constructor of a camera object.
*/
function Camera() {

	//=================
	// Public variables
	//=================

	this.x = 0;
	this.y = 0;

	this.scale = {x: 1, y: 1};

	this.offsetX = 0;
	this.offsetY = -64;

	this.target = null;


	//=================
	// Public functions
	//=================

	this.tick = function() {
		if (this.target) {
			this.x = this.target.x - this.offsetX;
			this.y = this.target.y - this.offsetY;
		}
	};

}


