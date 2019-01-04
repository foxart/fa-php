(function (window) {
	'use strict';
	/**
	 *
	 * @type {Document}
	 */
	var document = window.document;

	/**
	 *
	 * @param node_key
	 * @param node_value
	 * @param callback {Function}
	 */
	function eventListenerStatic(node_key, node_value, callback) {
		return function (event) {
			if (callback.call(node_value, node_key, event) === false) {
				event.preventDefault();
			}
			// event.stopPropagation();
			// event.stopImmediatePropagation();
		}
	}

	/**
	 *
	 * @param parent
	 * @param selector
	 * @param callback
	 * @param type
	 * @return {Function}
	 */
	function eventListenerDynamic(parent, selector, callback, type) {
		return function (event) {
			var index;
			var target = event.target;
			var related = event.relatedTarget;
			// find siblings of the target matches selector
			var siblings = (parent.parentNode || document).querySelectorAll(selector) || [];
			// loop through the siblings of the target
			while (target !== parent && target !== document) {
				// find target among siblings
				index = Array.prototype.indexOf.call(siblings, target);
				if (index !== -1) {
					break;
				}
				target = target.parentNode;
			}
			// make sure that it's not a parent of the target
			if (target === parent) {
				return;
			}
			if (type === 'mouseenter' || type === 'mouseleave') {
				// loop through the parents of the related target
				while (related && related !== target && related !== parent && related !== document) {
					if (related === document) {
						console.log(target, related, parent);
					}
					related = related.parentNode;
				}
				// make sure that it's not a child of the target
				if (target === related) {
					return;
				}
			}
			if (callback.call(target, index, event) === false) {
				event.preventDefault();
			}
		}
	}

	// var eventListnerOptions = {
	// 	capture: false,
	// 	once: true,
	// 	passive: true
	// };
	/**
	 *
	 * @param type
	 * @param selector
	 * @param callback
	 * @param options
	 * @return {Fa}
	 */
	Fa.prototype.on = function (type, selector, callback, options) {
		if (Fa.isFunction(selector)) {
			callback = callback === undefined ? false : callback;
			this.each(function (node_key, node_value) {
				node_value.addEventListener(type, eventListenerStatic(node_key, node_value, selector), callback);
			});
			return this;
		} else {
			options = options === undefined ? false : options;
			var type_dynamic = type;
			if (type === 'mouseenter') {
				type_dynamic = 'mouseover';
			}
			if (type === 'mouseleave') {
				type_dynamic = 'mouseout';
			}
			this.each(function (node_key, node_value) {
				node_value.addEventListener(type_dynamic, eventListenerDynamic(node_value, selector, callback, type), options);
			});
		}
	};
})(window);