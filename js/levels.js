/**
A collection of platform levels
*/
var Levels = {

	level1: {
		objects: [

		{name: "Guy", x: 32, y: 112},
		{name: "Guy", x: 32, y: 90},
		{name: "Square", x: 64, y: 112},
		{name: "Square", x: 128, y: 112},
		{name: "JumpButton", x: 160, y: 32}
		],

		backgrounds: [
			{filePath: "img/backgrounds/mountains.svg", x: 0, y: 0, scale: {x: 10, y: 10}, tiled: true}
		]
	}
};

/*
@TODO: Förstås ska det bara vara ett block för alla de här,
men än så länge följer inte grafiken med då man sätter width på objekt
*/
for (var i = 0; i < 12; i++) {
	Levels.level1.objects.push({name: "Block", x: 16*i, y: 128, width: 16, height: 16});
}
