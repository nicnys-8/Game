/**
An object within the game
*/
function createGameState() {

	var gameState = {objects: []};

	//=================
	// Public functions
	//=================
	gameState.addObject = function(obj) {
		gameState.objects.push(obj);
	};

	/**
	Returns a list of all objects with any of the specified behaviors
	@param arguments Any number of behavior names,
	e.g gameState.filter("Renderable", "Moving", "Solid");
	*/
	gameState.filter = function() {
		//@TODO: Cache lookups to increase efficiency
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

return gameState;
}
