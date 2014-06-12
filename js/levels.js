/**
A collection of platform levels
*/
var Levels = {

	level1: {
		objects: [

		{name: "guy", x: 32, y: 112},
		{name: "guy", x: 32, y: 90},
		{name: "square", x: 64, y: 112},
		{name: "square", x: 128, y: 112},
		{name: "button", x: 160, y: 112}
		]
	}
};

/*
@TODO: Förstås ska det bara vara ett block för alla de här,
men än så länge följer inte grafiken med då man sätter width på objekt
*/
for (var i = 0; i < 12; i++) {
	Levels.level1["objects"].push({name: "block", x: 16*i, y: 128, width: 16, height :16}); // Sergeant kolonplacering slår till igen
}
