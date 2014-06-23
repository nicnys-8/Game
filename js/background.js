/**
A background image object
*/
function Background(imgPath) {

	//==================
	// Private variables
	//==================

	var canvas = document.createElement("canvas");
	var img = new Image();

	img.src = imgPath;
	img.onload = function() {
		canvas.width = img.width;
		canvas.height = img.height;
		canvas.getContext("2d").drawImage(img, 0, 0);
	};
	

	//===========
	// Public API
	//===========

	this.x = 0;
	this.y = 0;
	this.scale = {x: 1, y: 1};
	this.rotation = 0;
	this.parallax = 1;
	this.alpha = 1;

	/**
	Renders the background on screen
	@param ctx 2D rendering context
	*/
	this.render = function(ctx) {
		var width = canvas.width;
		var height = canvas.height;
		var clippingX = 0;
		var clippingY = 0;
		var canvasX = 0;
		var canvasY = 0;

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.scale(this.scale.x, this.scale.y);
		ctx.rotate(this.rotation);
		ctx.globalAlpha = this.alpha; 

		ctx.drawImage(
			canvas,
			clippingX, clippingY,
			width, height, // Clipping size
			canvasX, canvasY,
			width, height
			);
		ctx.restore();
	};

}
