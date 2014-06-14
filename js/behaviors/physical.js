/**
Describes the behavior of a physical object
*/
Behavior.Physical = Behavior.Physical || function() {
	
	//================================
	// Private functions and variables
	//================================

	/**
	Check if this object overlaps another
	*/
	function overlapsObject(obj) {
		return (!(
			this.x + this.boundingBox.left >= obj.x + obj.boundingBox.right ||
			this.x + this.boundingBox.right <= obj.x + obj.boundingBox.left ||
			this.y + this.boundingBox.top >= obj.y + obj.boundingBox.bottom ||
			this.y + this.boundingBox.bottom <= obj.y + obj.boundingBox.top));
	}

	/**
	Check if this object would overlap another if it was moved
	to a specified point
	@param obj The object to check for collisions with
	@param offsetX The horizontal distance to check
	@param offsetY The vertical distance to check
	*/
	function overlapsAtOffset(obj, offsetX, offsetY) {
		return (!(
			this.x + offsetX + this.boundingBox.left >= obj.x + obj.boundingBox.right ||
			this.x + offsetX + this.boundingBox.right <= obj.x + obj.boundingBox.left ||
			this.y + offsetY + this.boundingBox.top >= obj.y + obj.boundingBox.bottom ||
			this.y + offsetY + this.boundingBox.bottom <= obj.y + obj.boundingBox.top));
	}

		
	function overlapsPoint(x, y) {
		return (!(
			this.x + this.boundingBox.left >= x ||
			this.x + this.boundingBox.right <= x ||
			this.y + this.boundingBox.top >= y ||
			this.y + this.boundingBox.bottom <= y));
	}
	
	//@TODO: document
	function overlapsBy(obj, coordinate) {
		switch (coordinate) {
			case "x":
				boundingBoxVar1 = "left"
				boundingBoxVar2 = "right"
				break;
			case "y":
				boundingBoxVar1 = "top"
				boundingBoxVar2 = "bottom"
				break;
			default:
				throw new Error("Not a valid coordinate.");
				break;
		}
		if (this[coordinate] < obj[coordinate]) {
			return this[coordinate] + this.boundingBox[boundingBoxVar2] - (obj[coordinate] + obj.boundingBox[boundingBoxVar1])
		} else {
			return this[coordinate] + this.boundingBox[boundingBoxVar1] - (obj[coordinate] + obj.boundingBox[boundingBoxVar2])
		}
	}
	
	//@deprecated
	function horizontalOverlap(obj) {
		if (this.x < obj.x) {
			return (this.x + this.boundingBox.right) - (obj.x + obj.boundingBox.left);
		} else {
			return (this.x + this.boundingBox.left) - (obj.x + obj.boundingBox.right);
		}
	}
	
	//@deprecated
	function verticalOverlap(obj) {
		if (this.y < obj.y) {
			return (this.y + this.boundingBox.bottom) - (obj.y + obj.boundingBox.top);
		} else {
			return (this.y + this.boundingBox.top) - (obj.y + obj.boundingBox.bottom);
		}
	}


	//=================
	// Public interface
	//=================

	var behavior = {};

	behavior.name = "Physical";

	behavior.getProperties = function() {
		return {
			// variables
			x: 0,
			y: 0,
			weight: 1,
			boundingBox: null, // e.g. {left: -8, right: 8, top: -8, bottom: 8}
			
			// Functions
			overlapsObject: overlapsObject,
			overlapsAtOffset: overlapsAtOffset,
			overlapsPoint: overlapsPoint,
			overlapsBy: overlapsBy,
			horizontalOverlap: horizontalOverlap,
			verticalOverlap: verticalOverlap,
		};
	};

	behavior.tick = function(gameState) {};

	return behavior;

}();
