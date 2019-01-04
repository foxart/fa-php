(function (window) {
	'use strict';
	/**
	 *
	 * @type {Document}
	 */
	var document = window.document;
	/**
	 *
	 * @type {string}
	 */
	var version = '1.3';
	/**
	 *
	 * @type {Array}
	 */
	var readyStack = [];
	// function sizzle(selector) {
	// 	if (Sizzle === undefined) {
	// 		throw new Error("Sizzle not found");
	// 	} else {
	// 		try {
	// 			return Sizzle(selector);
	// 		} catch (Exception) {
	// 			throw new Error(Exception);
	// 		}
	// 	}
	// }
	/**
	 * ready listener
	 */
	function ready() {
		document.removeEventListener("DOMContentLoaded", ready, false);
		window.removeEventListener("load", ready, false);
		// for (var i = 0; i < readyStack.length; i++) {
		// 	readyStack[i].apply(this);
		// }
		readyStack.forEach(function (value) {
			value.apply(this);
		})
	}

	function create(selector) {
		var context = new Fa();
		if (Fa.isTag(selector)) {
			context.selector = selector;
			context.length = 1;
			context[0] = document.createElement(Fa.extractTag(selector));
		} else if (Fa.isString(selector)) {
			var list = document.querySelectorAll(selector);
			context.selector = selector;
			context.length = list.length;
			list.forEach(function (element, i) {
				context[i] = element;
			});
		} else if (Fa.isNode(selector)) {
			context.selector = selector.nodeName;
			context.length = 1;
			context[0] = selector;
			// } else if (Fa.isArray(selector)) {
			// 	context.selector = 'array';
			// 	context.length = selector.length;
			// 	selector.forEach(function (element, i) {
			// 		context[i] = element;
			// 	});
			// } else if (type === 'HTMLAnchorElement' || type === 'HTMLDivElement'|| type === 'HTMLBodyElement') {
		} else {
			Fa.throwError(selector, "Unsupported selector");
			context.selector = selector;
			context.length = 0;
			context[0] = undefined;
		}
		return context;
	}

	/**
	 *
	 * @param selector
	 * @returns {Fa}
	 */
	var Fa = function (selector) {
		if (this instanceof Fa) {
			// console.log(this);
			return this;
		} else if (typeof selector === 'function') {
			// console.log('function');
			readyStack.push(selector);
		} else {
			// console.log(selector);
			return create(selector);
		}
	};
	/**
	 *
	 * @type {{fa: string, length: number, selector: string}}
	 */

	Fa.prototype = {
		fa: version,
		length: 0,
		selector: ''
	};
	/**
	 *
	 * @param args
	 * @return {Array}
	 */
	Fa.asArray = function (args) {
		return [].slice.call(args);
	};
	/**
	 *
	 * @param context
	 * @param error
	 * @param level
	 */
	Fa.throwError = function (context, error, level) {
		var stack = new Error().stack;
		var match;
		var trace = [];
		var expressionMozilla = /(.+)?(?:@)(.+)/g;
		var expressionChrome = /(?:\sat\s)(.+)(?:\()(.+)(?:\))/g;
		if (expressionMozilla.test(stack)) {
			expressionChrome.lastIndex = 0;
			while ((match = expressionMozilla.exec(stack)) !== null) {
				trace.push([match[1], match[2]]);
			}
		} else if (expressionChrome.test(stack)) {
			expressionChrome.lastIndex = 0;
			while ((match = expressionChrome.exec(stack)) !== null) {
				trace.push([match[1], match[2]]);
			}
		} else {
			console.warn(stack);
		}
		if (level === undefined) {
			level = 1;
		}
		trace.splice(0, level);
		for (var i = 0; i < trace.length; i++) {
			console.log(trace[i][0], trace[i][1]);
		}
		// throw {error: error, context: context};
		console.error({error: error, context: context});
	};
	/**
	 *
	 * @param args
	 * @param callback
	 * @returns {*}
	 */
	Fa.each = function (args, callback) {
		if (Array.isArray(args)) {
			for (var i = 0; i < args.length; i++) {
				if (callback.call(args[i], i, args[i]) === false) {
					break;
				}
			}
		} else {
			for (var key in args) {
				if (args.hasOwnProperty(key) && callback.call(args[key], key, args[key]) === false) {
					break;
				}
			}
		}
		return args;
	};
	/**
	 *
	 * @param context
	 */
	// Fa.testMultipleInstance = function (context) {
	// 	if (context.length > 1) {
	// 		Fa.throwError(context, "Dom error", "Multiple instaces found", 2);
	// 	}
	// };
	/**
	 *
	 * @param callback {Function}
	 */
	Fa.ready = function (callback) {
		readyStack.push(callback);
	};
	document.addEventListener("DOMContentLoaded", ready, false);
	window.addEventListener("load", ready, false);
	window.Fa = Fa;
})(window);
