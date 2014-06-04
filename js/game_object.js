/**
An object within the game
*/
var GameObject = function() {

    //===========
    // Properties
    //===========
    this.x = 0;
    this.y = 0;

    this.weight = 1;

    this.boundingBox = {
        left: 0, right: 16,
        top: 0, bottom: 16
    };

    this.behaviors = [];
    this.startTicks = [];
    this.endTicks = []; 
    
    //=================
    // Public functions
    //=================

    this.hasBehavior = function(behavior) {
        for (var i = 0; i < this.behaviors.length; i++) {
            if (behavior === this.behaviors[i]) {
                return true;
            }
        }
        return false;
    };

    /**
    Check if this object overlaps another
    */
    this.overlapsObject = function(obj) {
        return (!(this.x + this.boundingBox.left >= obj.x + obj.boundingBox.right ||
            this.x + this.boundingBox.right <= obj.x + obj.boundingBox.left ||
            this.y + this.boundingBox.top >= obj.y + obj.boundingBox.bottom ||
            this.y + this.boundingBox.bottom <= obj.y + obj.boundingBox.top));
    };

    this.horizontalOverlap = function(obj) {
        if (this.x < obj.x) {
            return (this.x + this.boundingBox.right) - (obj.x + obj.boundingBox.left);
        } else {
            return (this.x + this.boundingBox.left) - (obj.x + obj.boundingBox.right);
        }
    }

    this.verticalOverlap = function(obj) {
        if (this.y < obj.y) {
            return (this.y + this.boundingBox.bottom) - (obj.y + obj.boundingBox.top);
        } else {
            return (this.y + this.boundingBox.top) - (obj.y + obj.boundingBox.bottom);
        }
    }

    this.overlapsPoint = function(x, y) {
        return (!(this.x + this.boundingBox.left >= x ||
            this.x + this.boundingBox.right <= x ||
            this.y + this.boundingBox.top >= y ||
            this.y + this.boundingBox.bottom <= y));
    };

    this.onTopOf = function(obj) {
        return (!(this.x >= obj.x + obj.boundingBox.right ||
            this.x <= obj.x + obj.boundingBox.left) &&
        this.y + this.boundingBox.bottom === obj.y + obj.boundingBox.top);
    };

    this.placeFree = function(x, y, objects) {
        var obj;
        for (var i = 0; i < objects.length; i++) {
            obj = objects[i];
            // Ignore collisions with the object itself
            if (obj === this) {
                continue;
            }
            // Check if there is a collision at the specified position
            if (!(x + this.x + this.boundingBox.left >= obj.x + obj.boundingBox.right ||
                x + this.x + this.boundingBox.right <= obj.x + obj.boundingBox.left ||
                y + this.y + this.boundingBox.top >= obj.y + obj.boundingBox.bottom ||
                y + this.y + this.boundingBox.bottom <= obj.y + obj.boundingBox.top)) {
                return false;
            }
        }
        // Since no collision was detecteed, return true
        return true;
    };

    /**
     Actions to perform at each tick
     */
     this.tickStart = function(gameState) {
        for (var i = 0; i < this.startTicks.length; i++) {
            this.startTicks[i].call(this, gameState);
        }
    };

    /**
     Actions to perform at each tick
     */
     this.tickEnd = function(gameState) {
        for (var i = 0; i < this.endTicks.length; i++) {
            this.endTicks[i].call(this, gameState);
        }
    };
    
    /**
     Adds a behavior to the sprite object
     */
     this.addBehavior = function(behavior) {
        // Add the name of the behavior
        this.behaviors.push(behavior.name);
        // Add all behavior properties
        for (var p in behavior.properties) {
            this[p] = behavior.properties[p];
        }
        // Modify the target's tick function
        this.startTicks.push(behavior.tickStart);
        this.endTicks.push(behavior.tickEnd);
    };
};