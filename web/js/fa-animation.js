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
	 * @type {Document}
	 */
	var document = window.document;

	Fa.prototype.show = function (callback) {
		var context = this;
		// console.info(callback);
		// console.info(context);
		// if (callback!==undefined && typeof callback !== 'function') {
		// 	Fa.Exception('not a function');
		// }
		this.each(function (element) {
			element.style['display'] = 'block';
			if (callback !== undefined) {
				callback.apply(element);
			}
		});
		return this;
	};
	Fa.prototype.hide = function (callback) {
		// console.info(callback);
		var context = this;
		this.each(function (element) {
			element.style['display'] = 'none';
			if (callback !== undefined) {
				callback.apply(element);
			}
		});
		return this;
	};
})(window);