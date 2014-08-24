/**
Returns an object describing the state of a gaming session
*/
function GameState() {

	//================================
	// Private functions and variables
	//================================

	// Cache for storing filter queries
	var cache = {};


	//=================
	// Public Interface
	//=================

	this.objects = [];
	this.backgrounds = [];

	this.addObject = function(obj) {
		this.objects.push(obj);
	};

	this.addBackground = function(bkg) {
		this.backgrounds.push(bkg);
	};

	/**
	 * Filters a list of GameObjects. Can extract all GameObjects matching:
	 * 		-  any behavior in the filter set
	 * 		-  no behavior in the filter set
	 * 	depending on whether type parameter is set to "include" or "exlude"
	 * 	respectively.
	 *
	 * Can be called as:
	 * 		- filter( "Moving" );
	 * 			Returns all moving GameObjects in this.objects.
	 * 		- filter( ["Moving", "Solid"] );
	 * 			Returns all 'solid and moving' GameObjects in this.objects.
	 * 		- filter( "Controllable", "exclude");
	 * 			Returns all non-controllable GameObjects in this.objects.
	 * 		- filter( ["Moving", "Solid"], "include", filter("Controllable", "exclude")) );
	 * 			Returns all non-controllable GameObjects that are moving and solid in this.objects.
	 * 			
	 * @param  {[string]} 		filter 		Behaviors that act as filters
	 * @param  {string} 		type 		Either "include" or "exclude". Default is "include".
	 * @param  {[GameObject]} 	objects 	A list of objects which to filter. Default is this.objects.
	 * @return {[GameObject]}				Filtered list of GameObjects
	 */
	this.filter = function (filter, type, objects) {
		//@TODO: Cache lookups to increase efficiency!
		filter  = typeof filter  !== 'string'    ? filter  : [filter];
		type    = typeof type    !== 'undefined' ? type    : "include";
		objects = typeof objects !== 'undefined' ? objects : this.objects;
		var filteredObjects = [];

		// Loop through all objects
		for (var i = 0; i < objects.length; i++) {
			var currentObject = objects[i];

			// Check all behaviors to filter
			for (var j = 0; j < filter.length; j++) {
				
				var filterIndex = currentObject.behaviors.indexOf( filter[j] );
				if (type === "include") {
					// Including filter
					if ( filterIndex !== -1 ) {
						filteredObjects.push(currentObject);
						break;
					};
				} else {
					// Excluding filter
					if (  filterIndex !== -1 && j !== filter.length ) {
						continue;
					}
					filteredObjects.push(currentObject);
				}

			}
		}

		return filteredObjects;
	}

	/**
	Returns all objects that intersect the specified area
	*/
	this.objectsInZone = function(left, right, top, bottom) {
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
	Returns the object with the specified UID
	*/
	this.getObjectByUID = function(uid) {
		var obj, i;
		for (i = 0; i < this.objects.length; i++) {
			obj = this.objects[i];
			if (obj.uid === uid) {
				return obj;
			}
		}
	}

	/**
	Creates all objects from a level description
	@TODO: Parsaren ska fungera annorlunda i framtiden...!
	*/
	this.parseLevel = function(description) {
		var objDesc, obj, bkgDes, bkg;
		for (var i = 0; i < description.objects.length; i++) {
			objDesc = description.objects[i];
			obj = new ObjectFactory[objDesc.name](objDesc.width, objDesc.height);
			obj.x = objDesc.x;
			obj.y = objDesc.y;
			obj.uid = objDesc.uid;
			this.addObject(obj);
		}

		for (var i = 0; i < description.backgrounds.length; i++) {
			bkgDesc = description.backgrounds[i];
			bkg = new Background(bkgDesc.filePath);
			bkg.x = bkgDesc.x;
			bkg.y = bkgDesc.y;
			bkg.tiledX = bkgDesc.tiledX;
			bkg.tiledY = bkgDesc.tiledY;
			this.addBackground(bkg);
		}
	};

	/**
	Perform update functions for all in-game objects
	*/
	this.tick = function() {
		for (i = 0; i < this.objects.length; i++) {
			this.objects[i].tick(this);
		}
	};
}
