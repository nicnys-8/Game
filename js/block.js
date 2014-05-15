/**
A solid block
 */
function createBlock(ctx) {
    var block = new GameObject(ctx);
    
    block.addBehavior(Renderable);
    block.addBehavior(Solid);
    block.sprite = createSprite("img/block.png");

    return block;  
}