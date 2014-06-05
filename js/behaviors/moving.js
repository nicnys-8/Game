/**
Describes the behavior of a moving object
*/
function Moving() {
    //================================
    // Private functions and variables
    //================================

    function computeWeight(objects) {
        var weight = 0;
        for (var i = 0; i < objects.length; i++) {
            weight += obj.weight;
        }
        return weight;
    }

    /**
    Given an array of objects, this function returns the subset
    of all objects standing directly on top of this one
    @param objets The array to look through
    */
    function carriedObjects(objects) {
        var carried = [];
        for (var i = 0; i < objects.length; i++) {
            obj = objects[i];
            if (obj.hasBehavior("Moving") && obj.onTopOf(this)) {
                carried.push(obj);
            }
        }
        return carried;
    }

    /**
    Attempt to move the object
    @param deltaX The horizontal distance to travel
    @param deltaX The vertical distance to travel
    @param gameState Object describing the entire game state
    */
    function move(deltaX, deltaY, gameState) {
        var threshold = 0.1; //@TODO: Move this
        if (Math.abs(deltaY) > threshold) {
            this.tryVerticalMove(deltaY, gameState);
        }
        if (Math.abs(deltaX) > threshold) {
            this.tryHorizontalMove(deltaX, gameState);
        }
    }

    /**
    Attempt to move the object horizontally
    @param deltaX The horizontal distance to travel
    @param gameState Object describing the game state
    */
    function tryHorizontalMove(deltaX, gameState) {
        // Find all objects within the area that will be traversed
        var objects = gameState.objectsInZone(
            Math.min(this.x + this.boundingBox.left, this.x + this.boundingBox.left + deltaX),
            Math.max(this.x + this.boundingBox.right, this.x + this.boundingBox.right + deltaX),
            this.y + this.boundingBox.top - 1,//Plus one to account for carried objects!
            this.y + this.boundingBox.bottom
            );
        var carried = this.carriedObjects(objects);
        var prevX = this.x;
        var direction = deltaX ? deltaX < 0 ? -1 : 1 : 0 // Calculate the direction of deltaY
        var obj;
        var steps;
        var pushDistance;
        var temp;

        // Move the object
        this.x += deltaX;
        this.x = Math.round(this.x);

        // Check for collisions
        for (var i = 0; i < objects.length; i++) {
            obj = objects[i];

            // Ignore collisions with itself
            if (this === obj) {
                continue;
            }

            if (this.overlapsObject(obj)) {
                // Try pushing the obstacle
                if (obj.hasBehavior("Moving")) {
                    temp = this.x;
                    pushDistance = this.horizontalOverlap(obj);
                    this.x = prevX;
                    obj.tryHorizontalMove(pushDistance, gameState);
                    this.x = temp;
                } else {
                    this.hSpeed = 0;
                }
                // Move back until there is no overlap
                while (this.overlapsObject(obj)) {
                    this.x -= direction;
                }
            }
        }
        // Move carried objects
        pushDistance = this.x - prevX;
        for (var i = 0; i < carried.length; i++) {
            obj = carried[i];
            obj.tryHorizontalMove(pushDistance, gameState);
        }
    }
    
    /**
    Attempt to move the object vertically
    @param deltaX The vertical distance to travel
    @param gameState Object describing the game state
    */
    function tryVerticalMove(deltaY, gameState) {
        // Find all objects within the area that will be traversed
        var objects = gameState.objectsInZone(
            this.x + this.boundingBox.left,
            this.x + this.boundingBox.right,
            Math.min(this.y + this.boundingBox.top - 1, this.y + this.boundingBox.top - 1 + deltaY),//Plus one to account for carried objects!
            Math.max(this.y + this.boundingBox.bottom, this.y + this.boundingBox.bottom + deltaY)
            );
        var carried = this.carriedObjects(objects);
        var prevY = this.y;
        var direction = deltaY ? deltaY < 0 ? -1 : 1 : 0 // Calculate the direction of deltaY
        var obj;
        var steps;
        var pushDistance;
        var temp;

        // Move the object
        this.y += deltaY;
        this.y = Math.round(this.y);

        // Check for collisions
        for (var i = 0; i < objects.length; i++) {
            obj = objects[i];

            // Ignore collisions with itself
            if (this === obj) {
                continue;
            }
            if (this.overlapsObject(obj)) {
                // Try pushing the obstacle
                if (obj.hasBehavior("Moving") && deltaY < 0) {

                    temp = this.y;
                    pushDistance = this.verticalOverlap(obj); //@TODO: varför minus dir?
                    this.y = prevY;
                    obj.tryVerticalMove(pushDistance, gameState);
                    this.y = temp;

                } else {
                    this.vSpeed = 0;
                }
                // Move back until there is no overlap
                while (this.overlapsObject(obj)) {
                    this.y -= direction;
                }
            }
        }

        // Drag carried objects down
        // (jåå, det är så det ska va... det blir dålig styrsel annars!)
        pushDistance = this.y - prevY;
        if (deltaY > 0) {
            for (var i = 0; i < carried.length; i++) {
                pushDistance
                obj = carried[i];
                obj.tryVerticalMove(pushDistance, gameState);
            }
        }
    }

    //====================
    // Behavior properties
    //====================
    this.name = "Moving";

    this.properties = {
        // Properties
        hAcceleration: 0,
        vAcceleration: 0.4,
        hSpeed: 0,
        vSpeed: 0,
        maxHSpeed: 2,
        maxVSpeed: 7,

        // Functions
        move: move,
        tryHorizontalMove: tryHorizontalMove,
        tryVerticalMove: tryVerticalMove,
        carriedObjects: carriedObjects
    };

    //=======================
    // Behavior tick function
    //=======================
    this.tick = function(gameState) {
        var obj, solidObjects;

        this.hSpeed += this.hAcceleration;
        this.vSpeed += this.vAcceleration;

        // Limit vSpeed to maxVSpeed
        this.vSpeed = Math.max(Math.min(this.vSpeed, this.maxVSpeed), -this.maxVSpeed);

        // Limit hSpeed to maxHSpeed
        this.hSpeed = Math.max(Math.min(this.hSpeed, this.maxHSpeed), -this.maxHSpeed);

        this.move(this.hSpeed, this.vSpeed, gameState);
    };
}
