Object.inherit = function (Child, Parent) {
	(Child.prototype = Object.create(Child.superclass = Parent.prototype)).constructor = Child;
};

/** @constructor */
function A() {
	this.say = function () {
		console.log("may")
	};
	this.init = function () {
		console.log("init A instance")
	}
}

/** @constructor */
function B() {
	B.superclass.constructor.apply(this, arguments);//A.apply(this, arguments);
	/** @override */
	this.say = function () {
		console.log("gav")
	};
	var superInit = this.init;
	this.init = function () {
		superInit();//Parent `init` function
		console.log("init B instance")
	}
}

Object.inherit(B, A);
var a = new A;
a.say();
var b = new B;
b.init();
b.say();