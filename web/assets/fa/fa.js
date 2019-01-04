/*
 * foxart.org
 */
'use strict';
(function () { // Closure to not leak local variables to the global scope
	var Fa;
	Fa = {
		data: {},
		/**
		 *
		 * @constructor
		 */
		Exception: function () {
			throw Array.from(arguments).join(' -> ');
		},
		/**
		 *
		 * @param key
		 * @returns {{}}
		 */
		getData: function (key) {
			var result = {};
			if (key === undefined) {
				result = JSON.parse(JSON.stringify(this.data));
			} else {
				if (this.data[key] === undefined) {
					this.data[key] = {};
				}
				result = JSON.parse(JSON.stringify(this.data[key]));
			}
			return result;
		},
		/**
		 *
		 * @param key
		 * @param value
		 */
		setData: function (key, value) {
			this.data[key] = JSON.parse(JSON.stringify(value));
		},
		/**
		 *
		 * @param key
		 * @param value
		 */
		updateData: function (key, value) {
			this.data[key] = Object.assign(this.data[key], JSON.parse(JSON.stringify(value)));
		},
		/**
		 *
		 * @param item
		 * @returns {*|boolean}
		 */
		isObject: function (item) {
			return (item && typeof item === 'object' && !Array.isArray(item));
		},
		/**
		 *
		 * @param target
		 * @param source
		 * @returns {*}
		 */
		merge: function (target, source) {
			var output = Object.assign({}, target);
			if (Fa.isObject(target) && Fa.isObject(source)) {
				Object.keys(source).forEach(function (key) {
					var value = {};
					value[key] = source[key];
					if (Fa.isObject(source[key])) {
						if (!(key in target))
							Object.assign(output, value);
						else
							output[key] = Fa.merge(target[key], source[key]);
					} else {
						Object.assign(output, value);
					}
				});
			}
			return output;
		},
		/**
		 *
		 * @param data
		 * @param key
		 */
		filter: function (data, key) {
			// type = Object.prototype.toString.call(filter);
			// if (type === '[object Array]') {
			// 	result = [];
			// 	for (var i = 0; i < data.length; i++) {
			// 		var flag = true;
			// 		for (var f = 0; f < filter.length; f++) {
			// 			if (data[i][filter[f].key] !== filter[f].value) {
			// 				flag = false;
			// 			}
			// 		}
			// 		if (flag === true) {
			// 			result.push(data[i]);
			// 		}
			// 	}
			// } else if (type === '[object Object]') {
			// 	result = [];
			// 	for (var j = 0; j < data.length; j++) {
			// 		if (data[j][filter.key] === filter.value) {
			// 			result.push(data[j]);
			// 		}
			// 	}
			// } else {
			// 	result = data;
			// }
		},
		/**
		 *
		 * @param milliseconds
		 */
		pause: function (milliseconds) {
			var start = new Date().getTime();
			while ((new Date().getTime() - start) < milliseconds) {
			}
		},
		/**
		 *
		 * @param text
		 */
		escapeHtml: function (text) {
			var map = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};
			return text.replace(/[&<>"']/g, function (m) {
				return map[m];
			});
		},
		/**
		 *
		 * @returns {string}
		 */
		uniqueId: function () {
			return Math.random().toString(36).substr(2, 9);
		},
		/**
		 *
		 * @param onReadyFunction
		 */
		onDocumentLoad: function (onReadyFunction) {
			document.addEventListener('DOMContentLoaded', onReadyFunction);
		},
		/**
		 *
		 * @param onLoadFunction
		 */
		onWindowLoad: function (onLoadFunction) {
			window.addEventListener('load', onLoadFunction);
		},
		/**
		 *
		 * @param url
		 * @returns {{protocol, host: *|string, port: *|string, path, query, parameters: {}, fragment}}
		 */
		parseUrl: function (url) {
			if (url === undefined) {
				url = window.location.href;
			}
			var pattern = new RegExp(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
			// http://www.ietf.org/rfc/rfc3986.txt
			var matches = url.match(pattern);
			var parameters_match,
				parameters_pattern = /([^&=]+)=?([^&]*)/g,
				parametersDecode = function (string) {
					return decodeURIComponent(string.replace(/\+/g, " "));
				};
			var parameters = {};
			while (parameters_match = parameters_pattern.exec(matches[7])) {
				parameters[parametersDecode(parameters_match[1])] = parametersDecode(parameters_match[2]);
			}
			return matches && {
				protocol: matches[2],
				host: matches[4].split(':')[0],
				port: matches[4].split(':')[1],
				path: matches[5],
				query: matches[7],
				parameters: parameters,
				fragment: matches[9]
			};
			// var pattern = /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/;
			// var pattern = new RegExp([
			// 	'^(https?:)//', // protocol
			// 	'(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
			// 	'(/{0,1}[^?#]*)', // pathname
			// 	'(\\?[^#]*|)', // search
			// 	'(#.*|)$' // hash
			// ].join(''));
			// var matches = url.match(pattern);
			// return matches && {
			// 	protocol: matches[1],
			// 	host: matches[2],
			// 	hostname: matches[3],
			// 	port: matches[4],
			// 	path: matches[5],
			// 	query: matches[6],
			// 	fragment: matches[7]
			// }
		},
		/**
		 *
		 * @param xml
		 * @returns {*}
		 */
		parseXml: function (xml) {
			if (typeof window.DOMParser !== 'undefined') {
				return (new window.DOMParser()).parseFromString(xml, 'text/xml');
			} else if (typeof window.ActiveXObject !== 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
				var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = 'false';
				xmlDoc.loadXML(xml);
				return xmlDoc;
			} else {
				return false;
			}
		},
		/**
		 *
		 * @returns {boolean}
		 */
		checkIframe: function () {
			try {
				return window.self !== window.top;
			} catch (e) {
				return true;
			}
		},
		/**
		 *
		 * @returns {*}
		 */
		checkIe: function () {
			var ua = window.navigator.userAgent;
			// IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
			// IE 11 ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
			// Edge 12 (Spartan) ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
			// Edge 13 ua = 'Mozillad/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}
			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}
			var edge = ua.indexOf('Edge/');
			if (edge > 0) {
				// Edge (IE 12+) => return version number
				return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
			}
			// other browser
			return false;
		},
		// todo remove
		/**
		 *
		 * @param object
		 * @param level
		 * @returns {string}
		 */
		beautifyTxt: function (object, level) {
			var nl = '\r\n';
			var tab = '    ';
			var separator = '';
			if (level === undefined || level < 1) {
				level = 1;
			}
			for (var $i = 0; $i < level; $i++) {
				separator = separator + tab;
			}
			var result = '';
			if (typeof(object) === 'object') {
				for (var property in object) {
					// if (object.hasOwnProperty(property) && typeof(object[property]) === 'object') {
					if (object.hasOwnProperty(property) && Object.prototype.toString.call(object[property]) === '[object Object]') {
						result = result + separator + property + ': {' + nl + Fa.beautifyTxt(object[property], level + 1) + separator + '}';
					} else if (object.hasOwnProperty(property) && Object.prototype.toString.call(object[property]) === '[object Array]') {
						result = result + separator + property + ': [' + nl + Fa.beautifyTxt(object[property], level + 1) + separator + ']';
					} else {
						result = result + separator + property + ': ' + object[property];
					}
					var property_last = object[Object.keys(object)[Object.keys(object).length - 1]];
					//check
					if (object.hasOwnProperty(property) && object[property] === property_last) {
						result = result + nl;
					} else {
						result = result + ',' + nl;
					}
				}
				if (level === 1) {
					result = '{' + nl + result + '}';
				}
			} else {
				result = object;
			}
			return result;
		},
		// todo remove
		/**
		 *
		 * @param object
		 * @param level
		 * @returns {string}
		 */
		beautifyHtml: function (object, level) {
			var nl = '<br/>';
			var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
			var separator = '';
			if (level === undefined || level < 1) {
				level = 1;
			}
			for (var i = 0; i < level; i++) {
				separator = separator + tab;
			}
			var result = '';
			if (typeof(object) === 'object') {
				for (var property in object) {
					if (object.hasOwnProperty(property) && typeof(object[property]) === 'object') {
						result = result + separator + property + ': {' + nl + Fa.beautifyHtml(object[property], level + 1) + separator + '}';
					} else {
						result = result + separator + property + ': ' + object[property];
					}
					var property_last = object[Object.keys(object)[Object.keys(object).length - 1]];
					if (object.hasOwnProperty(property) && object[property] === property_last) {
						result = result + nl;
					} else {
						result = result + ',' + nl;
					}
				}
				if (level === 1) {
					result = '{' + nl + result + '}';
				}
			} else {
				result = object;
			}
			return result;
		},
		// todo remove
		/**
		 *
		 * @param search
		 * @param replace
		 * @param subject
		 * @param countObj
		 * @returns {*}
		 */
		stringReplace: function (search, replace, subject, countObj) {
			var i = 0;
			var j = 0;
			var temp = '';
			var repl = '';
			var sl;
			var fl = 0;
			var f = [].concat(search);
			var r = [].concat(replace);
			var s = subject;
			var ra = Object.prototype.toString.call(r) === '[object Array]';
			var sa = Object.prototype.toString.call(s) === '[object Array]';
			s = [].concat(s);
			var $global = (typeof window !== 'undefined' ? window : global);
			$global.$locutus = $global.$locutus || {};
			var $locutus = $global.$locutus;
			$locutus.php = $locutus.php || {};
			if (typeof (search) === 'object' && typeof (replace) === 'string') {
				temp = replace;
				replace = [];
				for (i = 0; i < search.length; i += 1) {
					replace[i] = temp
				}
				temp = '';
				r = [].concat(replace);
				ra = Object.prototype.toString.call(r) === '[object Array]'
			}
			if (typeof countObj !== 'undefined') {
				countObj.value = 0
			}
			for (i = 0, sl = s.length; i < sl; i++) {
				if (s[i] === '') {
					continue
				}
				for (j = 0, fl = f.length; j < fl; j++) {
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					if (typeof countObj !== 'undefined') {
						countObj.value += (temp.split(f[j])).length - 1
					}
				}
			}
			return sa ? s : s[0]
		}
	};
	window.Fa = Fa; // Publish public methods
})();
// fajs.prototype.myPlugin = function () {
// 	console.log('myPlugin', this.dom);
// 	return this; // return `this` for chainability
// };
