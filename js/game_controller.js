/**
Returns a game controller object (controller of the MVC pattern)
@param gameState Object describing the entire gamestate (model of the MVC pattern)
@param canvas A HTML5 canvas (view of the MVC pattern)
@param camera A camera object used to render the game
*/
function GameController(gameState, canvas, camera) {

	//================================
	// Private functions and variables
	//================================

	var ctx = canvas.getContext("2d");

	/**
	Runs the main game loop
	@param ctx A 2D rendering context (view of the MVC pattern)
	//@TODO: Red ut varför hejn inte kan deklareras som this.tick 
	*/
	function tick() {
		window.requestAnimationFrame(tick); // Repeats the function

		var renderList = gameState.filter("Renderable");
		var i;

		///////////////////////
		/*@ TODO: Det här ska bakas in i plattformsbeteendet tror jag,
		här ska det då definitivt inte ligga!!
		*/

		// Game controls
		if (controller.down("left")) {
			controlled.hAcceleration = -0.5;
		} else if (controller.down("right")) {
			controlled.hAcceleration = 0.5;
		} else {
			controlled.hAcceleration = -controlled.hSpeed / 5;
		}

		if (controller.pressed("up")) {
			controlled.jump();
		}

		if (controller.released("up")) {
			if (controlled.vSpeed < 0) {
				controlled.vSpeed /= 2;
			}
		}
		///////////////////////

		//===========
		// Game logic
		//===========

		this.camera.tick();

		// Perform update functions for all in-game objects
		for (i = 0; i < gameState.objects.length; i++) {
			gameState.objects[i].tick(gameState);
		}

		//==========
		// Rendering
		//==========

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.save();

		ctx.translate(
			-this.camera.x + (canvas.width / 2),
			-this.camera.y + (canvas.height / 2)
			);

		ctx.scale(this.camera.scale.x, this.camera.scale.y);

		// Render all backgrounds
		for (i = 0; i < gameState.backgrounds.length; i++) {
			gameState.backgrounds[i].render(ctx);
		}

		// Render in-game objects		
		for (i = 0; i < renderList.length; i++) {
			renderList[i].render(ctx);
		}

		ctx.restore();

	}


	//=================
	// Public Interface
	//=================

	this.camera = camera;
	this.tick = tick;
}
