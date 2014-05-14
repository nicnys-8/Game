/**
A solid block
 */
function createBlock(ctx) {
    var block = new GameObject(ctx);
    
    block.addBehavior(Renderable);
    block.sprite = createSprite("img/block.png");

    return block;  
}