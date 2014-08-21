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

	var controllable;
	var controlled = null;

	//=================
	// Public Interface
	//=================

	this.camera = camera;

	/**
	Runs the main game loop
	@param ctx A 2D rendering context (view of the MVC pattern)
	//@TODO: Red ut varför hejn inte kan deklareras som this.tick 
	*/
	this.tick = function() {
		var ctx = canvas.getContext("2d");
		var self = this;

		window.requestAnimationFrame(
			function(){
				self.tick();
			}
		); // Repeats the function

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
			if (controlled.onGround(gameState)) {
				controlled.jump();
			}
		}

		if (controller.pressed("x")) {
			this.controlNext();
		}

		if (controller.pressed("z")) {
			this.controlPrevious();
		}

		/*
		(Den här koden gör så att man kan hoppa olika högt...
		Men hopp som hopp, anser jag nästan! Därför sket jag i den.)
		if (controller.released("up")) {
			if (controlled.vSpeed < 0) {
				controlled.vSpeed /= 2;
			}
		}
		*/

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

		// Render all backgrounds
		for (i = 0; i < gameState.backgrounds.length; i++) {
			gameState.backgrounds[i].render(ctx);
		}

		ctx.save();

		ctx.translate(
			Math.round(-this.camera.x + (canvas.width / 2)),
			Math.round(-this.camera.y + (canvas.height / 2))
			);

		ctx.scale(this.camera.scale.x, this.camera.scale.y);

		// Render in-game objects		
		for (i = 0; i < renderList.length; i++) {
			renderList[i].render(ctx);
		}
		ctx.restore();
	}

	this.startGame = function() {
		controllable = gameState.filter("Controllable"); // A list of controllable characters
		this.setControlled(controllable[0]);
		this.tick(); // Start the tick loop
	};

	/**
	Sets which character is currently controlled by the player
	@param uid The character's unique identifier (@TODO: Require it to be a string or a number?)
	*/
	this.setControlled = function(object) {
		if (controlled) {
			controlled.hAcceleration = 0;
			controlled.hSpeed = 0;
		}
		controlled = object;
		this.camera.target = controlled;
	};

	/**
	Switches the controllable character to the next one in the list
	*/
	this.controlNext = function(uid) {
		var index = controllable.indexOf(controlled);
		index = (index + 1) % controllable.length;
		this.setControlled(controllable[index]);
	};

	/**
	Switches the controllable character to the previous one in the list
	*/
	this.controlPrevious = function(uid) {
		var index = controllable.indexOf(controlled);
		index = (controllable.length + (index - 1) % controllable.length) % controllable.length;
		this.setControlled(controllable[index]);
	};
}
