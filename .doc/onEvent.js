/*
https://github.com/Cristy94/dynamic-listener
https://elliotekj.com/2016/11/05/jquery-to-pure-js-event-listeners-on-dynamically-created-elements
*/

/* IE */
function attach(element, event_type, callback) {
	if (element.attachEvent) {
		element.attachEvent('on' + event_type, function () {
			if (callback.call(element, event) === false) {
				event.preventDefault();
			}
		});
	}
}

/**
 * Returns a modified callback function that calls the initial callback function only if the target element matches the given selector
 *
 * @param {string} selector
 * @param {function} callback
 */
function onCallback(selector, callback) {
	return function (event) {
		if (!event.target) return;
		if (!event.target.matches(selector)) return;
		if (callback.call(event.target, event) === false) {
			event.preventDefault();
		}
		event.stopPropagation();
	};
}

/**
 * Including this file adds the `addDynamicListener` to the ELement prototype.
 * The dynamic listener gets an extra `selector` parameter that only calls the callback if the target element matches the selector.
 * The listener has to be added to the container/root element and the selector should match the elements that should trigger the event.
 * Browser support: IE9+
 */
// Polyfil Element.matches https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) {
			}
			return i > -1;
		};
}
/**
 *
 *
 * @param {Element} rootElement The root element to add the linster too.
 * @param {string} eventType The event type to listen for.
 * @param {string} selector The selector that should match the dynamic elements.
 * @param {function} callback The function to call when an event occurs on the given selector.
 * @param {boolean|object} options Passed as the regular `options` parameter to the addEventListener function Set to `true` to use capture. Usually used as an object to add the listener as `passive`
 */
window.addDynamicEventListener = function (rootElement, eventType, selector, callback, options) {
	rootElement.addEventListener(eventType, onCallback(selector, callback), options);
};