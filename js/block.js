/**
 */
function createBlock(ctx) {
    var block = new GameObject(ctx, "img/block.png");
    
    //==============
    // Add behaviors
    //==============
    block.addBehavior(Sprite);
    block.setImage("img/block.png");

    return block;  
}