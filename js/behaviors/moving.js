/**
Describes the behavior of a moving object
*/
Behavior.Moving = Behavior.Moving || function() {
	
	//================================
	// Private functions and variables
	//================================
	
	function computeWeight(gameState) {
		var moving = gameState.filter("Moving");
		var carried = this.carriedObjects(moving);
		var weight = this.weight;
		for (var i = 0; i < carried.length; i++) {
			weight += carried[i].computeWeight(gameState);
		}
		return weight;
	}
	
	/**
	Given an array of objects, this function returns the subset
	of all objects carried by the target object
	(This function is not recursive, so it only returns the
	objects standing directly on the target)
	@param objets The array to look through
	*/
	function carriedObjects(objects) {
		var carried = [];
		for (var i = 0; i < objects.length; i++) {
			obj = objects[i];
			if (obj.hasBehavior("Moving") && obj.carriedBy(this)) {
				carried.push(obj);
			}
		}
		return carried;
	}
	
	/**
	Returns true if the object is standing firmly on the other one
	(which means it won't fall off if the other one moves)
	*/
	function carriedBy(obj) {
		return (!(this.x >= obj.x + obj.boundingBox.right ||
			this.x <= obj.x + obj.boundingBox.left) &&
		this.y + this.boundingBox.bottom === obj.y + obj.boundingBox.top);
	}
	
	/**
	Attempt to move the object
	@param deltaX The horizontal distance to travel
	@param deltaX The vertical distance to travel
	@param gameState Object describing the entire game state
	*/
	function move(deltaX, deltaY, gameState) {
		/*
		var totalWeight = this.computeWeight(gameState);
		var modifier = (this.strength - totalWeight) / this.strength;
		console.log(modifier);
		deltaX *= modifier;
		deltaY *= modifier;
		*/
		var threshold = 0.1; //@TODO: Flytta ut det här nånstans vettigt
		if (Math.abs(deltaY) > threshold) {
			this.tryMove(deltaY, "y", gameState);
		}
		if (Math.abs(deltaX) > threshold) {
			this.tryMove(deltaX, "x", gameState);
		}
	}
	
	/**
	Attemt to move object in a specified direction
	@param delta The distance to travel
	@param gameState Object describing the game
	*/
	function tryMove(delta, coordinate, gameState) {
		var deltaX;
		var deltaY;
		var speedVar;
		
		// Set up coordinate dependent variables and variable names
		switch (coordinate) {
			case "x":
				deltaX = delta;
				deltaY = 0;
				speedVar = "hSpeed";
				break;
			case "y":
				deltaX = 0;
				deltaY = delta;
				speedVar = "vSpeed";
				break;
			default:
				throw new Error("Not a valid coordinate.");
				break;
		}
		
		// Find all objects within the area that will be traversed
		var objects = gameState.objectsInZone(
			Math.min(this.x + this.boundingBox.left, this.x + this.boundingBox.left + deltaX),
			Math.max(this.x + this.boundingBox.right, this.x + this.boundingBox.right + deltaX),
			Math.min(this.y + this.boundingBox.top - 1, this.y + this.boundingBox.top - 1 + deltaY), // Plus (minus) one to account for carried objects!
			Math.max(this.y + this.boundingBox.bottom, this.y + this.boundingBox.bottom + deltaY)
			);
		
		var carried = this.carriedObjects(objects);
		var direction = delta ? delta < 0 ? -1 : 1 : 0; // Calculate the direction of delta
		var prev = this[coordinate];
		var totalWeight = this.computeWeight(gameState);
		var obj;
		var steps;
		var pushDistance;
		
		// Move the object
		this[coordinate] = Math.round(this[coordinate] + delta);
		
		// Check for collisions
		for (var i = 0; i < objects.length; i++) {
			obj = objects[i];
			// Ignore collisions with itself
			if (this === obj) {
				continue;
			}
			
			if (this.overlapsObject(obj)) {
				// Try pushing the obstacle
				pushDistance = this.overlapsBy(obj, coordinate);
				if ( obj.hasBehavior("Moving") && (coordinate !== "y" || deltaY < 0) ) {
					obj.tryMove(pushDistance, coordinate, gameState);
				} else {
					// If the obstacle can't be pushed, stop moving
					this[speedVar] = 0;
				}
				
				// Move back until there is no overlap
				while (this.overlapsObject(obj)) {
					this[coordinate] -= direction;
				}
			}
		}
		
		// Move carried objects or drag carried objects down
		pushDistance = this[coordinate] - prev;
		if (coordinate !== "y" || deltaY > 0) {
			for (var i = 0; i < carried.length; i++) {
				obj = carried[i];
				obj.tryMove(pushDistance, coordinate, gameState);
			}
		}
	}
	
	//=================
	// Public interface
	//=================
	
	var behavior = {};
	
	behavior.name = "Moving";
	
	behavior.getProperties = function() {
		return {
			// Variables
			hAcceleration: 0,
			vAcceleration: 0.4,
			hSpeed: 0,
			vSpeed: 0,
			maxHSpeed: 2,
			maxVSpeed: 7,
			strength: 3,
			
			// Functions
			move: move,
			tryMove: tryMove,
			tryHorizontalMove: tryHorizontalMove,
			tryVerticalMove: tryVerticalMove,
			carriedObjects: carriedObjects,
			carriedBy: carriedBy,
			computeWeight: computeWeight
		};
	};
	
	behavior.tick = function(gameState) {
		var obj, solidObjects;
		
		this.hSpeed += this.hAcceleration;
		this.vSpeed += this.vAcceleration;
		
		// Limit vSpeed to maxVSpeed in either direction
		this.vSpeed = Math.max(Math.min(this.vSpeed, this.maxVSpeed), -this.maxVSpeed);
		// Limit hSpeed to maxHSpeed in either direction
		this.hSpeed = Math.max(Math.min(this.hSpeed, this.maxHSpeed), -this.maxHSpeed);
		
		this.move(this.hSpeed, this.vSpeed, gameState);
	};
	
	return behavior;
}();
