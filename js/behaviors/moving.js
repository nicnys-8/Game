/**
Describes the behavior of a moving object
*/
var Moving = function() {
    var behavior = {};
    //================================
    // Private functions and variables
    //================================
    function move(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }

    function moveToHorizontalCollision(obj, hSpeed) {
        if (hSpeed > 0 && this.x + this.boundingBox.right < obj.x + obj.boundingBox.left) {
            this.x = obj.x + obj.boundingBox.left - this.boundingBox.right;
        } else if (hSpeed < 0 && this.x + this.boundingBox.left > obj.x + obj.boundingBox.right) {
            this.x = obj.x + obj.boundingBox.right - this.boundingBox.left;
        }
    }

    function moveToVerticalCollision(obj, vSpeed) {
        if (vSpeed > 0 && this.y + this.boundingBox.bottom < obj.y + obj.boundingBox.top) {
            this.y = obj.y + obj.boundingBox.top - this.boundingBox.bottom;
        } else if (this.y + this.boundingBox.top > obj.y + obj.boundingBox.bottom) {
            this.y = obj.y + obj.boundingBox.bottom - this.boundingBox.top;
        }
    }

    //====================
    // Behavior properties
    //====================
    behavior.name = "Moving";

    behavior.properties = {
        hAcceleration: 0,
        vAcceleration: 0,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7,

        move: move,
        moveToHorizontalCollision: moveToHorizontalCollision,
        moveToVerticalCollision: moveToVerticalCollision
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {
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

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        // If the object ended up inside a solid object, move back
        solidObjects = gameState.filter("Solid");

        this.x += this.hSpeed;
        for (i = 0; i < solidObjects.length; i++) {
            obj = solidObjects[i];
            if (this.overlapsObject(obj)) {
                this.x -= this.hSpeed;
                this.hSpeed = 0;
                this.moveToHorizontalCollision(obj, this.hSpeed);
                break;
            }
        }

        this.y += this.vSpeed;
        for (i = 0; i < solidObjects.length; i++) {
            obj = solidObjects[i];
            if (this.overlapsObject(obj)) {
                this.y -= this.vSpeed;
                this.vSpeed = 0;
                this.moveToVerticalCollision(obj, this.vSpeed);
                break;
            }
        }
/*
    console.log(DON'T LEAVE ANY GLOBAL VARIABLES BY MISTAKE!!);
        // Move horizontally
        dir = this.hSpeed / Math.abs(this.hSpeed);
        var collision = false;
        for (i = 0; i < Math.abs(this.hSpeed); i++) {
            if (collision) return;
            this.x += dir;
            for (j = 0; j < solidObjects.length; j++) {
                obj = solidObjects[j];
                if (this.overlapsObject(obj)) {
                    console.log("C");
                    collision = true;
                    this.x -= dir;
                    break;
                }
            }
        }*/
    };

    return behavior;
}();
