/**
Describes the behavior of a moving object
 */
var Moving = function() {
    var behavior = {};
    //================================
    // Private functions and variables
    //================================
    function move(deltaX, deltY) {
        this.x += this.hSpeed;
        this.y += this.vSpeed;
    }

    //====================
    // Behavior properties
    //====================
    behavior.name = "moving";

    behavior.properties = {
        hAcceleration: 0,
        vAcceleration: 0,
        
        hSpeed: 0,
        vSpeed: 0,
        
        maxHSpeed: 2,
        maxVSpeed: 7,

        move: move
    };
    
    //========================
    // Behavior tick functions
    //========================
    behavior.tickStart = function(gameState) {};
    behavior.tickEnd = function(gameState) {

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

        this.move(this.hSpeed, this.vSpeed);

        /*
        // If the object ended up inside a solid object, move back
        var obj;
        for (var i = 0; i < solidObjects.length; i++) {
            obj = solidObjects[i];
            if (this.overlapsObject(obj)) {
                console.log("Collision!");
                this.move(-hSpeed, -vSpeed);
                break;
            }
        };*/

    };

    return behavior;
}();
