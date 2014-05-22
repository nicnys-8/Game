/**
Describes the behavior of a moving object
*/
function Moving() {
    //================================
    // Private functions and variables
    //================================

    /**
    Attempt to move the object horizontally
    @param deltaX The horizontal distance to travel
    @param solidObjects A list of objects to check for collisions
    */
    function tryHorizontalMove(deltaX, gameState) {
        var obj;
        var solidObjects = gameState.filter("Solid");
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
                this.x -= deltaX;
                // ... try to move the other object
                if (obj.hasBehavior("Moving")) {
                    obj.tryHorizontalMove(0.3 * deltaX, gameState);
                }
                this.moveToHorizontalCollision(obj, deltaX);
            }
        }
        this.x = Math.round(this.x);
    }

    /**
    Attempt to move the object vertically
    @param deltaX The vertical distance to travel
    @param solidObjects A list of objects to check for collisions
    */
    function tryVerticalMove(deltaY, gameState) {
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
                this.y -= deltaY;
                // If heading down, stop moving
                if (deltaY > 0) {
                    this.vSpeed = 0;
                }
                // Try pushing the colliding object
                else if (obj.hasBehavior("Moving")) {
                    obj.tryVerticalMove(0.3 * deltaY, gameState);
                }
                // If the object couldn't be pushed, stop moving
                else {
                    this.vSpeed = 0;
                }
                this.moveToVerticalCollision(obj, deltaY);
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
        hAcceleration: 0,
        vAcceleration: 0.4,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7,

        tryHorizontalMove: tryHorizontalMove,
        tryVerticalMove: tryVerticalMove,
        moveToHorizontalCollision: moveToHorizontalCollision,
        moveToVerticalCollision: moveToVerticalCollision
    };

    //========================
    // Behavior tick functions
    //========================
    this.tickStart = function(gameState) {};
    this.tickEnd = function(gameState) {
        var obj, solidObjects, i;

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

        // If the object still has vSpeed or hSpeed, try to move it
        if (this.hSpeed !== 0 || this.vSpeed !== 0) {
            this.tryHorizontalMove(this.hSpeed, gameState);
            this.tryVerticalMove(this.vSpeed, gameState);
        }
    };
}
