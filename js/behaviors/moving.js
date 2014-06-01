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

    function carriedObjects(gameState) {
        var carried = [];
        var movingObjects = gameState.filter("Moving");
        for (var i = 0; i < movingObjects.length; i++) {
            obj = movingObjects[i];
            if (obj.onTopOf(this)) {
                carried.push(obj);
            }
        }
        return carried;
    }

    /**
    Attempt to move the object
    @param deltaX The horizontal distance to travel
    @param deltaX The vertical distance to travel
    @param solidObjects A list of objects to check for collisions
    */
    function move(deltaX, deltaY, gameState) {
        var threshold = 0.02; //@TODO: Move this
        if (Math.abs(this.vSpeed) > threshold) {
            this.tryVerticalMove(deltaY, gameState);
        }

        if (Math.abs(this.hSpeed) > threshold) {
            this.tryHorizontalMove(deltaX, gameState);
        }
    }

    /**
    Attempt to move the object horizontally
    @param deltaX The horizontal distance to travel
    @param solidObjects A list of objects to check for collisions
    */
    function tryHorizontalMove(deltaX, gameState) {
        var obj;
        var carried = [];
        var solidObjects = gameState.filter("Solid");
        var carried = this.carriedObjects(gameState);
        var totalWeight = this.weight + computeWeight(carried);
        // Move the object
        this.x += deltaX;
        // Check for collisions
        for (var i = 0; i < solidObjects.length; i++) {
            obj = solidObjects[i];
            // Ignore collisions with itself
            if (this === obj) {
                continue;
            }
            // If the object ended up inside another...
            if (this.overlapsObject(obj)) {
                // ... move back...
                this.x = this.lastX;
                // ... and try pushing the other object
                if (obj.hasBehavior("Moving")) {
                    obj.tryHorizontalMove(deltaX
                        , gameState);
                } else {
                    this.hSpeed = 0;                    
                }
                this.moveToHorizontalCollision(obj, deltaX);
                break;
            }
        }
        // Move all carried objects
        if (carried.length === 2) console.log(this);
        for (var j = 0; j < carried.length; j++) {
            // Sort by x first maybe!
            carried[j].tryHorizontalMove(this.x - this.lastX, gameState);
            //carried[j].hSpeed += (this.x - this.lastX);
            //console.log(this);
        }
        this.x = Math.round(this.x);
    }

    /**
    Attempt to move the object vertically
    @param deltaX The vertical distance to travel
    @param solidObjects A list of objects to check for collisions
    */
    function tryVerticalMove(deltaY, gameState) {
        //console.log(deltaY);
        var obj;
        var solidObjects = gameState.filter("Solid");
        this.y += deltaY;
        // Check for collisions
        for (var i = 0; i < solidObjects.length; i++) {
            obj = solidObjects[i];
            // Ignore collisions with itself
            if (this === obj) {
                continue;
            }
            // If the object ended up inside another...
            if (this.overlapsObject(obj)) {
                // ... move back
                this.y = this.lastY;
                // If heading down, stop moving
                if (deltaY > 0) {
                    this.vSpeed = 0;
                }
                // Try pushing the colliding object
                else if (obj.hasBehavior("Moving")) {
                    obj.tryVerticalMove(deltaY, gameState);
                }
                // If the object couldn't be pushed, stop moving
                else {
                    this.vSpeed = 0;
                }

                if ((deltaY > 0 && this.y + this.boundingBox.bottom < obj.y + obj.boundingBox.top) ||
                    (deltaY < 0 && this.y + this.boundingBox.top < obj.y > obj.y + obj.boundingBox.bottom)) {
                    this.moveToVerticalCollision(obj, deltaY);
                }   
            }
        }
        this.y = Math.round(this.y);
    }

    function moveToHorizontalCollision(obj, deltaX) {
        if (deltaX > 0) {
            this.x = obj.x + obj.boundingBox.left - this.boundingBox.right;
        } else if (deltaX < 0) {
            this.x = obj.x + obj.boundingBox.right - this.boundingBox.left;
        }
    }

    function moveToVerticalCollision(obj, deltaY) {
        if (deltaY > 0) {
            this.y = obj.y + obj.boundingBox.top - this.boundingBox.bottom;
        } else if (deltaY < 0) {
            this.y = obj.y + obj.boundingBox.bottom - this.boundingBox.top;
        }
    }

    //====================
    // Behavior properties
    //====================
    this.name = "Moving";

    this.properties = {
        lastX: 0,
        lastY: 0,
        hAcceleration: 0,
        vAcceleration: 0.4,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7,

        move: move,
        tryHorizontalMove: tryHorizontalMove,
        tryVerticalMove: tryVerticalMove,
        moveToHorizontalCollision: moveToHorizontalCollision,
        moveToVerticalCollision: moveToVerticalCollision,
        carriedObjects: carriedObjects
    };

    //========================
    // Behavior tick functions
    //========================
    this.tickStart = function(gameState) {};
    this.tickEnd = function(gameState) {
        var obj, solidObjects, i;

        this.lastX = this.x;
        this.lastY = this.y;

        this.hSpeed += this.hAcceleration;
        this.vSpeed += this.vAcceleration;

        // Limit vSpeed to maxVSpeed
        if ((this.vSpeed) > this.maxVSpeed) {
            this.vSpeed = this.maxVSpeed;
        } else if ((this.vSpeed) < -this.maxVSpeed) {
            this.vSpeed = -this.maxVSpeed;
        }

        // Limit hSpeed to maxHSpeed
        if ((this.hSpeed) > this.maxHSpeed) {
            this.hSpeed = this.maxHSpeed;
        } else if ((this.hSpeed) < -this.maxHSpeed) {
            this.hSpeed = -this.maxHSpeed;
        }

        this.move(this.hSpeed, this.vSpeed, gameState);
    };
}
