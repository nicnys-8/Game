/**
An animation that can be rendered on screen
@param imgPath Path to the image file
@param numFrames The number of frames in the animation
@param hotspot The anchor point of the animation
*/
function createAnimation(imgPath, numFrames, hotspot) {
	var animation = {};

	//==================
	// Private variables
	//==================
	var img, width, height;

	//=================
	// Public variables
	//=================
	animation.frame = 0;
	animation.numFrames = numFrames;
	animation.hotspot = hotspot;
	animation.imageSpeed = 0;
	animation.canvas;

	//=================
	// Public functions
	//=================
	animation.tick = function() {
		animation.frame = (animation.frame + animation.imageSpeed) % (animation.numFrames - 1);
	};

	/**
	Renders the animation on screen
	@param ctx 2D rendering context
	@param x, y Position on the context to render
	@param scale Scale of the animation, e.g. {x: 1, y: 2}
	@param rotation The animation's rotation in radians 
	@param	alpha Opacity of the object, a value between 0 and 1
	*/
	animation.render = function(ctx, x, y, scale, rotation, alpha) {
		var clippingX = Math.round(animation.frame) * width, clippingY = 0,
		clippingWidth = width, clippingHeight = height,
		canvasX = -this.hotspot.x, canvasY = -this.hotspot.y;

		ctx.save();
		ctx.translate(x, y);
		ctx.scale(scale.x, scale.y);
		ctx.rotate(rotation);
		ctx.globalAlpha = alpha; 

		ctx.drawImage(
			animation.canvas,
			clippingX, clippingY,
			clippingWidth, clippingHeight,
			canvasX, canvasY,
			width, height
			);
		ctx.restore();
	};


	//===============
	// Initialization
	//===============

	// @TODO: Skapa en kanvas per animation, inte per instans!
	animation.canvas = document.createElement("canvas");
	img = new Image();
	img.src = imgPath;
	img.onload = function() {
		width = img.width / animation.numFrames;
		height = img.height;

		animation.canvas.width = img.width;
		animation.canvas.height = img.height;
		animation.canvas.getContext("2d").drawImage(img, 0, 0);
	};

	return animation;
}