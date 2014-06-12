/**
Returns a game controller object (controller of the MVC pattern)
@param gameState Object describing the entire gamestate (model of the MVC pattern)
@canvas A HTML5 canvas (view of the MVC pattern)
*/
function GameController(gameState, canvas) {

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


		// Perform update functions for all in-game objects
		for (var i = 0; i < state.objects.length; i++) {
			gameState.objects[i].tick(state);
		}

		// Clear the canvas and render in-game objects
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < renderList.length; i++) {
			renderList[i].render(ctx);
		}
	}


	//=================
	// Public Interface
	//=================

	this.tick = tick;
}
