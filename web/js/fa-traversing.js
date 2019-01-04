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

	function asSingleDom(context) {
		if (context.length === 0) {
			Fa.throwError(context.selector, "Selector not found", 2);
			return context[0];
		} else if (context.length > 1) {
			Fa.throwError(context.selector, "Multiple selectors found", 2);
			return context[0];
		} else {
			return context[0];
		}
	}

	function arrayToFa(args, context, selector, callee) {
		var map = new Fa();
		selector = selector === undefined ? '*' : selector;
		map.selector = context.selector + '->' + callee + '(' + selector + ')';
		map.length = args.length;
		for (var i = 0; i < map.length; i++) {
			map[i] = args[i];
		}
		return map;
	}

	function filterNode(node, filter) {
		if (filter && filter.length > 0) {
			return Array.prototype.indexOf.call(filter, node) !== -1;
		} else {
			return true;
		}
	}

	/**
	 *
	 * @param node
	 * @param direction
	 * @param filter
	 * @returns {Fa|*}
	 */
	function sibling(node, direction, filter) {
		while ((node = node[direction]) && node.nodeType !== 1) {
		}
		if ((filterNode)(node, filter)) {
			return [node];
		} else {
			return [];
		}
	}

	function siblings(node, filter) {
		var result = [];
		// for (; node; node = node.nextSibling) {
		while (node !== null) {
			console.log(node);
			if (node.nodeType === 1 && (filterNode)(node, filter)) {
				result.push(node);
			}
			node = node.nextSibling
		}
		return result;
	}

	/**
	 *
	 * @param selector
	 */
	Fa.prototype.find = function (selector) {
		var context = asSingleDom(this);
		return arrayToFa(context.querySelectorAll(selector), this, selector, 'find');
	};
	/**
	 *
	 * @param selector
	 */
	Fa.prototype.previous = function (selector) {
		var context = asSingleDom(this);
		var filter;
		if (selector) {
			filter = context.parentNode.querySelectorAll(selector);
		}
		return arrayToFa(sibling(context, "previousSibling", filter), this, selector, 'previous');
	};
	Fa.prototype.next = function (selector) {
		var context = asSingleDom(this);
		var filter;
		if (selector) {
			filter = context.parentNode.querySelectorAll(selector);
		}
		return arrayToFa(sibling(context, "nextSibling", filter), this, selector, 'next');
	};
	/**
	 *
	 * @param selector
	 */
	Fa.prototype.siblings = function (selector) {
		var context = asSingleDom(this);
		var filter;
		console.log('-->',this, context);
		if (selector) {
			filter = context.parentNode.querySelectorAll(selector);
		}
		// filter.push(context);
		//
		return arrayToFa(siblings(context.parentNode.firstChild, filter), this);
		// return siblings((elem.parentNode || {}).firstChild, elem);
	};
	Fa.prototype.children = function (selector) {
		var context = asSingleDom(this);
		var filter;
		if (selector) {
			filter = context.querySelectorAll(selector);
		}
		return arrayToFa(siblings(context.firstChild, filter), this, selector, 'children');
	};
})(window);