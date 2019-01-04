/*
 * foxart.org
 */
'use strict';
/**
 *
 * @param selector
 * @returns {Fa.Dom}
 * @constructor
 */
Fa.Dom = function (selector) {
	if (this instanceof Fa.Dom === false) {
		return new Fa.Dom(selector);
	} else {
		this.selector = selector;
		this.element = this.getElementBySelector(selector);
		return this;
	}
};
Fa.Dom.prototype.getElementBySelector = function (selector) {
	var result;
	if (selector === undefined) {
		result = null;
	} else if (typeof selector === 'object') {
		result = selector;
	} else if (typeof selector === 'string') {
		if (selector === 'body') {
			result = document.body;
		} else {
			switch (selector.charAt(0)) {
				case '#':
					result = document.getElementById(selector.substring(1, selector.length));
					break;
				case '.':
					var node = document.getElementsByClassName(selector.substring(1, selector.length));
					if (node.length !== 0) {
						result = node;
					} else {
						result = null;
					}
					break;
				default:
					result = document.createElement(selector);
			}
		}
	} else {
		result = undefined;
	}
	return result;
};
/*
ELEMENT_NODE	1
ATTRIBUTE_NODE 	2
TEXT_NODE	3
CDATA_SECTION_NODE 	4
ENTITY_REFERENCE_NODE 	5
ENTITY_NODE 	6
PROCESSING_INSTRUCTION_NODE	7
COMMENT_NODE	8
DOCUMENT_NODE	9
DOCUMENT_TYPE_NODE	10
DOCUMENT_FRAGMENT_NODE	11
NOTATION_NODE 	12
*/
Fa.Dom.prototype.exist = function () {
	// return this.element !== null;
	return document.body.contains(this.element);
};
Fa.Dom.prototype.isNode = function (node) {
	// return node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11;
	return (
		typeof Node === 'object' ? node instanceof Node : node && typeof node === 'object' && typeof node.nodeType === 'number' && typeof node.nodeName === 'string'
	);
};
Fa.Dom.prototype.getType = function (element) {
	return ({}).toString.call(element).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
Fa.Dom.prototype.manipulateElement = function (iterateFunction) {
	if (this.isNode(this.element) === false) {
		for (var i = this.element.length - 1; i >= 0; i--) {
			iterateFunction(this.element[i]);
		}
	} else {
		iterateFunction(this.element);
	}
	// switch (this.getType(this.element)) {
	// 	case 'htmlcollection':
	// 		for (var i = this.element.length - 1; i >= 0; i--) {
	// 			iterateFunction(this.element[i]);
	// 		}
	// 		break;
	// 	default:
	// 		iterateFunction(this.element);
	// }
};
/*
 * events
 */
Fa.Dom.prototype.on = function (user_event, user_function) {
	// event.stopPropagation();
	// event.stopImmediatePropagation();
	this.manipulateElement(function (element) {
		if (element.attachEvent) {
			/* IE */
			element.attachEvent('on' + user_event, user_function);
		} else {
			/* Gecko */
			element.addEventListener(user_event, user_function, false);
		}
	});
	// var context = this;
	// document.querySelector('body').addEventListener(user_event, function (event) {
	// 	context.manipulateElement(function (element) {
	// 		if (event.target === element) {
	// 			user_function.apply(element);
	// 			if (user_function.apply(element, event) === false) {
	// 				event.preventDefault();
	// 			}
	// 		}
	//
	// 	});
	// }, true);
	// return this;
};
/*
 * manipulations
 */
// Fa.Dom.prototype.value = function (value) {
// 	if (value === undefined) {
// 		return this.element.value;
// 	} else {
// 		this.manipulateElement(function (element) {
// 			element.value = value;
// 		});
// 		return this;
// 	}
// };
// Fa.Dom.prototype.addClass = function (className) {
// 	this.manipulateElement(function (element) {
// 		// element.className += ' ' + className;
// 		element.classList.add(className);
// 	});
// 	return this;
// };
// Fa.Dom.prototype.removeClass = function (className) {
// 	this.manipulateElement(function (element) {
// 		// element.className = element.className.replace(new RegExp('(^|\\s)'+ className + '(\\s|$)'), ' ');
// 		element.classList.remove(className);
// 	});
// 	return this;
// };
// Fa.Dom.prototype.hasClass = function (className) {
// 	if (this.isNode(this.element) === false) {
// 		var result = [];
// 		this.manipulateElement(function (element) {
// 			result.push(element.classList.contains(className));
// 		});
// 		return result;
// 	} else {
// 		return this.element.classList.contains(className);
// 	}
// };
/*
 * attribute
 */
// Fa.Dom.prototype.attribute = function (key, value) {
// 	if (value === undefined) {
// 		if (typeof key === 'string') {
// 			/* get */
// 			if (this.isNode(this.element) === false) {
// 				var result = [];
// 				this.manipulateElement(function (element) {
// 					result.push(element.getAttribute(key));
// 				});
// 				return result;
// 				// Fa.Exception('multiple instances of: ' + this.selector);
// 			} else {
// 				return this.element.getAttribute(key);
// 			}
// 			// return this.element.getAttribute(key);
// 		} else {
// 			/* set */
// 			this.manipulateElement(function (element) {
// 				for (var property in key) {
// 					element.setAttribute(property, key[property]);
// 				}
// 			});
// 			return this;
// 		}
// 	} else {
// 		/* set */
// 		this.manipulateElement(function (element) {
// 			element.setAttribute(key, value);
// 		});
// 		return this;
// 	}
// };
/*
 * css
 */
// Fa.Dom.prototype.css = function (key, value) {
// 	if (value === undefined) {
// 		if (typeof key === 'string') {
// 			/* get */
// 			if (this.isNode(this.element) === false) {
// 				var result = [];
// 				this.manipulateElement(function (element) {
// 					result.push(window.getComputedStyle(element)[key]);
// 				});
// 				return result;
// 				// Fa.Exception('multiple instances of: ' + this.selector);
// 			} else {
// 				return window.getComputedStyle(this.element)[key];
// 			}
// 		} else {
// 			/* set */
// 			this.manipulateElement(function (element) {
// 				for (var property in key) {
// 					element.style[property] = key[property];
// 				}
// 			});
// 			return this;
// 		}
// 	} else {
// 		/* set */
// 		this.manipulateElement(function (element) {
// 			element.style[key] = value;
// 		});
// 		return this;
// 	}
// };
Fa.Dom.prototype.cssUnit = function (property) {
	var units = [
		'em', 'ex', 'px', 'cm', 'mm', 'in', 'pt', 'pc'
	];
	if (units.includes(property.substring(property.length - 2, property.length))) {
		return property.substring(property.length - 2, property.length);
	} else if (property.substring(property.length - 1, property.length) === '%') {
		return '%'
	} else {
		return '';
	}
};
/*
 * actions
 */
Fa.Dom.prototype.show = function (callback) {
	var context = this;
	// console.info(callback);
	// console.info(context);
	// if (callback!==undefined && typeof callback !== 'function') {
	// 	Fa.Exception('not a function');
	// }
	this.manipulateElement(function (element) {
		element.style['display'] = 'block';
		if (callback !== undefined) {
			callback.apply(element);
		}
	});
	return this;
};
Fa.Dom.prototype.hide = function (callback) {
	// console.info(callback);
	var context = this;
	this.manipulateElement(function (element) {
		element.style['display'] = 'none';
		if (callback !== undefined) {
			callback.apply(element);
		}
	});
	return this;
};
Fa.Dom.prototype.fadeIn = function (duration, callback) {
	var context = this;
	if (typeof duration === 'function') {
		callback = duration;
		duration = undefined;
	}
	this.manipulateElement(function (element) {
		var opacity = element.style['opacity'] === '' ? 1 : element.style['opacity'];
		element.style['display'] = 'block';
		element.style['opacity'] = 0;
		context.animateElement(element, 'opacity', opacity, duration, function () {
			if (callback !== undefined) {
				callback.apply(element);
			}
		});
	});
};

Fa.Dom.prototype.fadeOut = function (duration, callback) {
	var context = this;
	if (typeof duration === 'function') {
		callback = duration;
		duration = undefined;
	}
	this.manipulateElement(function (element) {
		var opacity = element.style['opacity'] === '' ? 1 : element.style['opacity'];
		context.animateElement(element, 'opacity', 0, duration, function () {
			element.style['display'] = 'none';
			element.style['opacity'] = opacity;
			if (callback !== undefined) {
				callback.apply(element);
			}
		});
	});
};
/*
 * animations
 */
Fa.Dom.prototype.animateTimeFraction = function (animation, timeFraction) {
	var x = 1.5;
	switch (animation) {
		case 'linear':
			return timeFraction;
			break;
		case 'acceleration':
			return Math.pow(timeFraction, 2);
			break;
		case 'arc':
			return 1 - Math.sin(Math.acos(timeFraction));
			break;
		case 'bow':
			return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
			break;
		case 'pulse':
			return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
			break;
		default:
			return timeFraction
	}
};
Fa.Dom.prototype.animateFrameFunction = function (duration, animation, draw, callback) {
	var context = this;
	var start = window.performance.now();
	window.requestAnimationFrame(function animate(time) {
		// timeFraction от 0 до 1
		var timeFraction = (time - start) / duration;
		if (timeFraction > 1) {
			timeFraction = 1;
		}
		// текущее состояние анимации
		// var progress = context.animateTimeFraction(animation,timeFraction);
		// draw(progress);
		draw(context.animateTimeFraction(animation, timeFraction));
		if (timeFraction < 1) {
			window.requestAnimationFrame(animate);
		} else {
			if (callback !== undefined) {
				callback.apply(this);
			}
		}
	});
};
Fa.Dom.prototype.animateElement = function (element, property, value, duration, callback) {
	var context = this;
	if (duration === undefined) {
		duration = 500;
	}
	this.animateFrameFunction(
		duration,
		'arc',
		function (progress) {
			element.style[property] =
				parseFloat(window.getComputedStyle(element)[property]) + (parseFloat(value) - parseFloat(window.getComputedStyle(element)[property])) * progress + context.cssUnit(window.getComputedStyle(element)[property])
		},
		callback
	);
};
Fa.Dom.prototype.animate = function (property, value, duration, callback) {
	var context = this;
	this.manipulateElement(function (element) {
		context.animateElement(element, property, value, duration, callback)
	});
};
Fa.Dom.prototype.scrollY = function (value, duration, callback) {
	var context = this;
	var scroll;
	if (duration === undefined) {
		duration = 500;
	}
	switch (value) {
		case 'top':
			scroll = 0;
			break;
		case 'bottom':
			scroll = this.element.scrollHeight;
			break;
		default:
			scroll = value;
	}
	if (this.element.scrollHeight !== this.element.clientHeight) {
		this.animateFrameFunction(
			duration,
			'linear',
			function (progress) {
				context.element.scrollTop = parseFloat(context.element.scrollTop) + (scroll - parseFloat(context.element.scrollTop)) * progress;
			},
			callback
		);
	}
};
