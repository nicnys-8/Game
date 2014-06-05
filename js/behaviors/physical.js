/**
Describes the behavior of a physical object
*/
function Physical() {
    //================================
    // Private functions and variables
    //================================

    /**
    Check if this object overlaps another
    */
    function overlapsObject(obj) {
        return (!(this.x + this.boundingBox.left >= obj.x + obj.boundingBox.right ||
            this.x + this.boundingBox.right <= obj.x + obj.boundingBox.left ||
            this.y + this.boundingBox.top >= obj.y + obj.boundingBox.bottom ||
            this.y + this.boundingBox.bottom <= obj.y + obj.boundingBox.top));
    };

    function overlapsPoint(x, y) {
        return (!(this.x + this.boundingBox.left >= x ||
            this.x + this.boundingBox.right <= x ||
            this.y + this.boundingBox.top >= y ||
            this.y + this.boundingBox.bottom <= y));
    };

    function horizontalOverlap(obj) {
        if (this.x < obj.x) {
            return (this.x + this.boundingBox.right) - (obj.x + obj.boundingBox.left);
        } else {
            return (this.x + this.boundingBox.left) - (obj.x + obj.boundingBox.right);
        }
    }

    function verticalOverlap(obj) {
        if (this.y < obj.y) {
            return (this.y + this.boundingBox.bottom) - (obj.y + obj.boundingBox.top);
        } else {
            return (this.y + this.boundingBox.top) - (obj.y + obj.boundingBox.bottom);
        }
    }

    function onTopOf(obj) {
        return (!(this.x >= obj.x + obj.boundingBox.right ||
            this.x <= obj.x + obj.boundingBox.left) &&
        this.y + this.boundingBox.bottom === obj.y + obj.boundingBox.top);
    };

    //====================
    // Behavior properties
    //====================
    this.name = "Physical";

    this.properties = {
        // Properties
        x: 0,
        y: 0,
        weight: 1,
        boundingBox: null, // e.g. {left: -8, right: 8, top: -8, bottom: 8}

        // Functions
        overlapsObject: overlapsObject,
        overlapsPoint: overlapsPoint,
        horizontalOverlap: horizontalOverlap,
        verticalOverlap: verticalOverlap,
        onTopOf: onTopOf,
    };

    //=======================
    // Behavior tick function
    //=======================
    this.tick = function(gameState) {};
}
