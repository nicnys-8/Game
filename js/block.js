/**
A solid block
 */
function createBlock(ctx) {
    var block = new GameObject(ctx);
    
    block.addBehavior(Renderable);
    block.addBehavior(Solid);
    block.currentAnimation = createAnimation("img/block.png", 1);

    return block;  
}