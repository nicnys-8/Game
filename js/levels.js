/**
A collection of platform levels
*/
var Levels = {

	level1: {
		objects: [
		{name: "Boba", x: 32, y: 112, uid: 0},
		{name: "Giri", x: 64, y: 112, uid: 1},
		{name: "Niri", x: 128, y: 100, uid: 2},
		{name: "Majje", x: 158, y: 100, uid: 3},
		{name: "JumpButton", x: 160, y: 32}
		],

		backgrounds: [
			{filePath: "img/backgrounds/sun.svg", x: 300, y: 32, tiledX: false, tiledY: false},
			{filePath: "img/backgrounds/mountains.svg", x: 0, y: 360, tiledX: true, tiledY: false},
			{filePath: "img/backgrounds/clouds.svg", x: 0, y: 0, tiledX: true, tiledY: false}
		]
	}
};

/*
@TODO: Förstås ska det bara vara ett block för alla de här,
men än så länge följer inte grafiken med då man sätter width på objekt
*/
for (var i = 0; i < 12; i++) {
	Levels.level1.objects.push({name: "Block", x: 64 * i, y: 256, width: 64, height: 32});
}
