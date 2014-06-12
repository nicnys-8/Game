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
	@param objList Optional object list to filter from
	@param arguments Any number of behavior names,
	e.g gameState.filter("Renderable", "Moving", "Solid");
	*/
	// @TODO: Granska om hejn blev dumt. Nu kan man ellra filtrar genom att göra exempelvis: filter(filter("Moving"), "Solid")
	gameState.filter = function(objList /* +Arbitrary number of arguments */) {
		//@TODO: Cache lookups to increase efficiency!

		var objects = [];
		var obj, behavior, iStart;
		
		if (typeof(objList) !== "string") {
			objList = gameState.objects;
			iStart = 1;
		} else {
			iStart = 0;
		}
		
		// For each object
		for (var i = iStart; i < gameState.objects.length; i++) {
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
	@TODO: Parsaren ska fungera annorlunda i framtiden...!
	*/
	gameState.parseLevel = function(description) {
		var objDesc, obj;
		for (var i = 0; i < description.objects.length; i++) {
			objDesc = description.objects[i];
			switch (objDesc.name) {
				case "block":
				obj = new Block(objDesc.width, objDesc.height);
				break;

				case "guy":
				obj = new Guy();
				break;

				case "square":
				obj = new Square();
				break;

				case "button":
				obj = new JumpButton();
				break;
			}
			obj.x = objDesc.x;
			obj.y = objDesc.y;
			gameState.addObject(obj);
		}
	};

	return gameState;
}
