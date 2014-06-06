/**
Returns an object describing the state of a gaming session
*/
function createGameState() {

	//================================
	// Private functions and variables
	//================================

	// Cache for storing filter queries
	var cache = {};


	//=================
	// Public Interface
	//=================

	var gameState = {};
	gameState.objects = [];

	gameState.addObject = function(obj) {
		gameState.objects.push(obj);
	};

	/**
	Returns a list of all objects with any of the specified behaviors
	@param arguments Any number of behavior names,
	e.g gameState.filter("Renderable", "Moving", "Solid");
	*/
	gameState.filter = function(/* Arbitrary number of arguments */) {
		//@TODO: Cache lookups to increase efficiency!

		var objects = [];
		var obj, behavior;

		// For each object
		for (var i = 0; i < gameState.objects.length; i++) {
			obj = gameState.objects[i];
			
			// For each of the object's behaviors
			for (var j = 0; j < arguments.length; j++) {
				behavior = arguments[j];
				
				// Check if the behavior matches one of the function's arguments
				if (obj.behaviors.indexOf(behavior) !== -1) {
					objects.push(obj);
				}
			}
		}
		return objects;
	};

	/**
	Returns all objects that intersect the specified area
	*/
	gameState.objectsInZone = function(left, right, top, bottom) {
		var pObjects = this.filter("Physical");
		var result = [];
		var obj;
		for (var i = 0; i < pObjects.length; i++) {
			obj = pObjects[i];
			if (!(
				obj.x + obj.boundingBox.left >= right ||
				obj.x + obj.boundingBox.right <= left ||
				obj.y + obj.boundingBox.top >= bottom ||
				obj.y + obj.boundingBox.bottom <= top)) {
				result.push(obj);
			}
		}
		return result;
	};

	/**
	Creates all objects from a level description
	*/
	gameState.parseLevel = function(description) {
		var objDesc, obj;
		for (var i = 0; i < description.objects.length; i++) {
			objDesc = description.objects[i];
			switch (objDesc.name) {
				case "block":
					obj = createBlock(objDesc.width, objDesc.height);
					obj.x = objDesc.x;
					obj.y = objDesc.y;
					gameState.addObject(obj);
				break;
			}
		}
	};

return gameState;
}
