/*
 * ELEMENT_NODE					1
 * ATTRIBUTE_NODE				2
 * TEXT_NODE					3
 * CDATA_SECTION_NODE 			4
 * ENTITY_REFERENCE_NODE 		5
 * ENTITY_NODE 					6
 * PROCESSING_INSTRUCTION_NODE	7
 * COMMENT_NODE					8
 * DOCUMENT_NODE				9
 * DOCUMENT_TYPE_NODE			10
 * DOCUMENT_FRAGMENT_NODE		11
 * NOTATION_NODE 				12
 */
(function (window) {
	'use strict';

	/**
	 *
	 * @param args
	 * @param order
	 * @returns {Array}
	 */
	function extractArguments(args, order) {
		var list;
		var result = [];
		if (Fa.instance(args)) {
			result = order === true ? Fa.asArray(args) : Fa.asArray(args).reverse();
		} else if (Fa.isNode(args)) {
			result.push(args);
		} else if (Fa.isArray(args)) {
			// list = order === true ? args : Fa.asArray(args).reverse();
			list = order === true ? args : args.reverse();
			for (var i = 0; i < list.length; i++) {
				result = result.concat(extractArguments(list[i], order));
			}
			// } else if (Fa.isString(args)) {
		} else {
			result.push(args);
			// Fa.throwError(args, "Unsupported argument type");
		}
		return result;
	}

	/**
	 *
	 * @param node
	 */
	function removeElement(node) {
		// node.remove();
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 *
	 * @param callback
	 */
	Fa.prototype.each = function (callback) {
		Fa.each(Fa.asArray(this), callback);
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.before = function (args) {
		var list = extractArguments(args, true);
		this.each(function () {
			var target = this;
			for (var i = 0; i < list.length; i++) {
				if (Fa.isNode(list[i])) {
					var clone = list[i].cloneNode(true);
					removeElement(list[i]);
					target.parentNode.insertBefore(clone, target);
				} else {
					target.insertAdjacentHTML('beforebegin', list[i]);
				}
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.after = function (args) {
		var list = extractArguments(args, false);
		this.each(function (j) {
			var target = this;
			// for (var i = 0; i < list.length; i++) {
			Fa.each(list, function (i, value) {
				// console.log(i,value)
				if (Fa.isNode(list[i])) {
					var clone = list[i].cloneNode(true);
					removeElement(list[i]);
					target.parentNode.insertBefore(clone, target.nextSibling);
				} else if (Fa.isFunction(list[i])) {
					target.insertAdjacentHTML('afterend', list[i].call(target, j, target));
				} else {
					target.insertAdjacentHTML('afterend', list[i]);
				}
			})
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.prepend = function (args) {
		var list = extractArguments(args, false);
		this.each(function () {
			var target = this;
			for (var i = 0; i < list.length; i++) {
				if (Fa.isNode(list[i])) {
					var clone = list[i].cloneNode(true);
					removeElement(list[i]);
					target.insertBefore(clone, target.firstChild);
				} else {
					target.insertAdjacentHTML('afterbegin', list[i]);
				}
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.append = function (args) {
		var list = extractArguments(args, true);
		this.each(function (j) {
			var target = this;
			for (var i = 0; i < list.length; i++) {
				if (Fa.isNode(list[i])) {
					var clone = list[i].cloneNode(true);
					removeElement(list[i]);
					target.appendChild(clone);
				} else if (Fa.isFunction(list[i])) {
					target.insertAdjacentHTML('beforeend', list[i].call(target, j, target));
					return this;
				} else {
					target.insertAdjacentHTML('beforeend', list[i]);
				}
			}
		});
		return this;
	};
	/**
	 *
	 * @returns {Array}
	 */
	Fa.prototype.clone = function () {
		var clone = [];
		this.each(function (key, value) {
			clone[key] = value.cloneNode(true)
		});
		return clone;
	};
	/**
	 *
	 */
	Fa.prototype.remove = function () {
		this.each(function (key, value) {
			removeElement(value)
		});
	};
	/**
	 *
	 */
	Fa.prototype.clean = function () {
		this.each(function (key, value) {
			// node.innerHTML = "";
			value.textContent = "";
		});
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.addClass = function (args) {
		this.each(function (key, value) {
			if (Fa.isArray(args)) {
				args.forEach(function (class_name) {
					value.classList.add(class_name);
				});
			} else {
				value.classList.add(args);
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Fa}
	 */
	Fa.prototype.removeClass = function (args) {
		// element.className = element.className.replace(new RegExp('(^|\\s)'+ className + '(\\s|$)'), ' ');
		this.each(function (key, value) {
			if (Fa.isArray(args)) {
				args.forEach(function (class_name) {
					value.classList.remove(class_name);
				});
			} else {
				value.classList.remove(args);
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {*}
	 */
	Fa.prototype.hasClass = function (args) {
		if (Fa.isArray(args)) {
			var result = true;
			this.each(function (key, value) {
				args.forEach(function (class_name) {
					if (value.classList.contains(class_name) === false) {
						result = false;
					}
				});
			});
			return result;
		} else {
			return this[0].classList.contains(args);
		}
	};
	/**
	 *
	 * @param args
	 * @return {Object|String}
	 */
	Fa.prototype.getAttribute = function (args) {
		var result = {};
		var node = this[0];
		if (Fa.isArray(args)) {
			/*get from array*/
			for (var i = 0; i < args.length; i++) {
				result[args[i]] = node.getAttribute(args[i]);
			}
			return result;
		} else if (Fa.isString(args)) {
			/*get single*/
			return node.getAttribute(args);
		} else {
			/*get all*/
			for (var j = 0; j < node.attributes.length; j++) {
				result[node.attributes[j].name] = node.attributes[j].value;
			}
		}
		return result;
	};
	/**
	 *
	 * @param key
	 * @param value
	 * @return {Fa}
	 */
	Fa.prototype.setAttribute = function (key, value) {
		this.each(function (node_key) {
			if (Fa.isObject(key)) {
				/*set from object*/
				var element = this;
				Fa.each(key, function (object_key, object_value) {
					element.setAttribute(object_key, object_value);
				});
			} else if (Fa.isFunction(value)) {
				/*set from callback*/
				this.setAttribute(key, value.call(this, node_key, this.getAttribute(key)));
			} else {
				/*set key value*/
				this.setAttribute(key, value);
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Object|String}
	 */
	Fa.prototype.getCss = function (args) {
		var result = {};
		var style = window.getComputedStyle(this[0], null);
		if (Fa.isArray(args)) {
			/*get from array*/
			for (var i = 0; i < args.length; i++) {
				result[args[i]] = style.getPropertyValue(args[i]);
			}
		} else if (Fa.isString(args)) {
			/*get single*/
			result = style.getPropertyValue(args);
		} else {
			/*get all*/
			for (var j = 0; j < style.length; j++) {
				result[style[j]] = style.getPropertyValue(style[j]);
			}
		}
		return result;
	};
	/**
	 *
	 * @param key
	 * @param value
	 * @returns {Fa}
	 */
	Fa.prototype.setCss = function (key, value) {
		this.each(function (node_key) {
			if (Fa.isObject(key)) {
				/*set from object*/
				var element = this;
				Fa.each(key, function (object_key, object_value) {
					element.style[object_key] = object_value;
				});
			} else if (Fa.isFunction(value)) {
				/*set from callback*/
				this.style[key] = value.call(this, node_key, window.getComputedStyle(this, null).getPropertyValue(key));
			} else {
				/*set key value*/
				this.style[key] = value;
			}
		});
		return this;
	};
	/**
	 *
	 * @param args
	 * @returns {Fa|String}
	 */
	Fa.prototype.html = function (args) {
		if (args === undefined) {
			return this[0].innerHTML;
		} else if (Fa.isFunction(args)) {
			this.each(function (key) {
				this.innerHTML = args.call(this, key, this.innerHTML);
			});
			return this;
		} else {
			this.each(function (key, value) {
				value.innerHTML = args;
			});
			return this;
		}
	};
	/**
	 *
	 * @param args
	 * @returns {Fa|String}
	 */
	Fa.prototype.text = function (args) {
		if (args === undefined) {
			return this[0].textContent;
		} else if (Fa.isFunction(args)) {
			this.each(function (key) {
				this.textContent = args.call(this, key, this.textContent);
			});
			return this;
		} else {
			this.each(function (key, value) {
				value.textContent = args;
			});
			return this;
		}
	};
	/**
	 *
	 * @param args
	 * @return {Fa|String}
	 */
	Fa.prototype.value = function (args) {
		if (args === undefined) {
			return this[0].value;
		} else if (Fa.isFunction(args)) {
			this.each(function (key) {
				this.value = args.call(this, key, this.value);
			});
			return this;
		} else {
			this.each(function (key, value) {
				value.value = args;
			});
			return this;
		}
	};
})(window);