/**
Returns an object describing the state of a gaming session
*/
function GameState() {

	//================================
	// Private functions and variables
	//================================

	// Cache for storing filter queries
	var cache = {
        exlude:{},
        include:{}
    };
    
    this.cacheHits = 0;
    this.cacheMisses = 0;
    
    function clearCache() {
        cache.exlude = {};
        cache.include = {};
    }

    
	//=================
	// Public Interface
	//=================

	this.objects = [];
	this.backgrounds = [];
    this.objectsByUID = {};
    this.music = null;

	this.addObject = function(obj) {
		this.objects.push(obj);
        
        if (obj.uid !== null && (typeof obj.uid !== "undefined")) { // obj.uid is false when uid == 0...
            
            if (this.objectsByUID[obj.uid]) {
                console.warn("Uh oh, maybe UID " + obj.uid + " is not as unique as you thought!");
            }
            
            this.objectsByUID[obj.uid] = obj;
        }
        
        clearCache();
	};
    
    this.removeObject = function(obj) {
        var index = this.objects.indexOf(obj);
        if (index) {
            this.objects.splice(index, 1);
            if (obj.uid) {
                delete this.objectsByUID[obj.uid];
            }
            clearCache();
        }
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
		// filter  = (typeof filter  !== 'string')    ? filter  : [filter];
		type    = (typeof type    !== 'undefined') ? type    : "include";
		// objects = (typeof objects !== 'undefined') ? objects : this.objects;

        var query,
            cachedQuery,
            storeQuery = false,
            i, j, flen,
            filteredObjects = [],
            currentObject;
        
        if (typeof filter === "string") { // Only 99.7% safe to use typeof with strings!! :)
            query = filter;
            filter = [filter];
        } else {
            query = filter.join("/");
        }
        
        // Crappy caching (only when searching all objects (for now (maybe))) :D
        // Ett varningens ord, ja lyssna nu: Om behaviors läggs till under spelets gång FÖRLORAR DU - Klotho, Lachesis eller Atropos
        if (typeof objects === "undefined") {
            cachedQuery = cache[type][query];
            if (cachedQuery) {
                this.cacheHits++;
                return cachedQuery;
            } else {
                // this.cacheMisses++;
                objects = this.objects;
                storeQuery = true;
            }
        }
        this.cacheMisses++;
        
        flen = filter.length;
        
        switch (type) {
            case "exclude":
                for (i = 0; i < objects.length; i++) {
                    currentObject = objects[i];
                    for (j = 0; j < flen; j++) {
                        if (currentObject.hasBehavior(filter[j])) {
                            break;
                        }
                    }
                    // Exclude object if it has ANY of the behaviors in 'filter'
                    if (j === flen) {
                        filteredObjects.push(currentObject);
                    }
                }
                break;
            case "include":
            default:
                for (i = 0; i < objects.length; i++) {
                    currentObject = objects[i];
                    for (j = 0; j < flen; j++) {
                        // Include object if it has ANY of the behaviors in 'filter'
                        if (currentObject.hasBehavior(filter[j])) {
                            filteredObjects.push(currentObject);
                            break;
                        }
                    }
                }
                break;
        }
        
        if (storeQuery) {
            cache[type][query] = filteredObjects;
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
        return this.objectsByUID[uid];
        /*
		var obj, i;
		for (i = 0; i < this.objects.length; i++) {
			obj = this.objects[i];
			if (obj.uid === uid) {
				return obj;
			}
		}
         */
	}

	/**
	Creates all objects from a level description
	@TODO: Parsaren ska fungera annorlunda i framtiden...!
	*/
	this.parseLevel = function(description) {
		var objDesc, obj, bkgDes, bkg, i;

		for (i = 0; i < description.objects.length; i++) {
			objDesc = description.objects[i];
            obj = ObjectFactory.createObject(objDesc);
            this.addObject(obj);
            /*
			obj = new ObjectFactory[objDesc.name](objDesc.width, objDesc.height);
			obj.x = objDesc.x;
			obj.y = objDesc.y;
			obj.uid = objDesc.uid;
			this.addObject(obj);
             */
		}

		for (i = 0; i < description.backgrounds.length; i++) {
			bkgDesc = description.backgrounds[i];
			bkg = new Background(bkgDesc.filePath);
			bkg.x = bkgDesc.x;
			bkg.y = bkgDesc.y;
			bkg.tiledX = bkgDesc.tiledX;
			bkg.tiledY = bkgDesc.tiledY;
			this.addBackground(bkg);
		}

		this.music = AudioFactory.createSound(description.music);
		this.music.play();
		console.log(this.music);
	};

	/**
	Perform update functions for all in-game objects
	*/
	this.tick = function() {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].tick(this);
		}
	};
}
