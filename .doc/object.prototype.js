Object.extend = function (dest, source) {
	Object.getOwnPropertyNames(source).forEach(function (key) {
		dest[key] = source[key];
	});
};

var _prototype = Object.create(Function.prototype);
Object.extend(_prototype, {
	constructor: function (d) {
		console.log("construct, argument : ", d);
		this.d = d;
		// this is your constructor logic
	},
	call: function () {
		console.log("call", this.d);
		// this get's called when you invoke the "function" that is the instance
		return "from call";
	},
	method: function () {
		console.log("method");
		// some method
		return "return from method";
	},
	// some attr
	attr: 42
});

var functionFactory = function (_prototype) {
	return function () {
		var f = function () {
			return f.call.apply(f, arguments);
		};
		Object.keys(_prototype).forEach(function (key) {
			f[key] = _prototype[key];
		});
		f.constructor.apply(f, arguments);
		return f;
	}
};