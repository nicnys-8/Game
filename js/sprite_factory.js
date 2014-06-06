/**
A singleton factory used to create new sprites.
It reuses sprite canvases, so that any two sprites
with identical file paths will use the same canvas
*/

var SpriteFactory = function() {

	var factory = {};

	/**
	Returns a sprite object
	@param imgPath Path to the image file
	@param numFrames The number of frames of the animation
	@param hotspot Anchorpoint of the sprite relative to
	the upper corner of each frame, e.g. {x: 8, y: 8}
	*/
	factory.createSprite = function(imgPath, numFrames, hotspot) {

		var canvas = document.createElement("canvas");
		var img = new Image();

		img.src = imgPath;

		img.onload = function() {

			canvas.width = img.width;
			canvas.height = img.height;
			canvas.getContext("2d").drawImage(img, 0, 0);
		};

		return new Sprite(canvas, numFrames, hotspot);
	}

	return factory;
}();

