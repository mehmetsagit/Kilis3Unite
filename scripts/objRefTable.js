const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Plugins.Mouse,
		C3.Plugins.Touch
	];
};
self.C3_JsPropNameTable = [
	{arka: 0},
	{btn1: 0},
	{btn2: 0},
	{ev: 0},
	{Mouse: 0},
	{Touch: 0}
];

self.InstanceType = {
	arka: class extends self.ISpriteInstance {},
	btn1: class extends self.ISpriteInstance {},
	btn2: class extends self.ISpriteInstance {},
	ev: class extends self.ISpriteInstance {},
	Mouse: class extends self.IInstance {},
	Touch: class extends self.IInstance {}
}