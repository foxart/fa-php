'use strict';
(function () {
	/**
	 *
	 * @param item
	 * @returns {boolean}
	 */
	Fa.instance = function (item) {
		return item instanceof Fa;
	};
	/**
	 *
	 * @param item
	 * @returns {boolean}
	 */
	Fa.isString = function (item) {
		return (typeof item === "string");
	};
	/**
	 *
	 * @returns {boolean}
	 */
	Fa.isArray = Array.isArray;
	/**
	 *
	 * @param item
	 * @returns {boolean}
	 */
	Fa.isObject = function (item) {
		return (typeof item === "object" && !Array.isArray(item));
	};
	/**
	 *
	 * @param item
	 * @returns {boolean}
	 */
	Fa.isFunction = function (item) {
		return (typeof item === "function");
	};
	/**
	 *
	 * @param element
	 * @return {boolean}
	 */
	Fa.isElement = function (element) {
		return (
			typeof HTMLElement === "object" ? element instanceof HTMLElement : element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName === "string"
		);
	};
	/*
	 *
	 * @param tag
	 * @returns {boolean}
	 */
	Fa.isTag = function (tag) {
		return (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i).test(tag)
	};
	Fa.extractTag = function (tag) {
		return (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i).exec(tag)[1];
	};
	/**
	 *
	 * @param node
	 * @returns {boolean}
	 */
	Fa.isNode = function (node) {
		return (
			typeof Node === "object" ? node instanceof Node : node && typeof node === "object" && typeof node.nodeType === "number" && typeof node.nodeName === "string"
		);
	};
	/**
	 *
	 * @param nodes
	 * @returns {boolean}
	 */
	Fa.isNodeList = function (nodes) {
		var stringRepr = Object.prototype.toString.call(nodes);
		return typeof nodes === 'object' && /^\[object (HTMLCollection|NodeList)]$/.test(stringRepr) && (typeof nodes.length === 'number') && (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
	};
	/**
	 *
	 * @param value
	 * @returns {string}
	 */
	Fa.typeOf = function (value) {
		if (value === undefined) {
			return 'Undefined';
		} else if (value === null) {
			return 'Null';
		} else {
			var funcNameRegex = /function (.+)\(/;
			var results = (funcNameRegex).exec((value).constructor.toString());
			return (results && results.length > 1) ? results[1] : "";
		}
	};
})();