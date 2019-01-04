/*
 * foxart.org
 */
'use strict';
Fa.Cookie = {
	/**
	 *
	 * @param name
	 * @returns {*}
	 */
	get: function (name) {
		if (name !== undefined) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		} else {
			var cookies = document.cookie.split(';');
			var result = [];
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				// trim first space if any
				while (cookie.charAt(0) === ' ') {
					cookie = cookie.substring(1, cookie.length);
				}
				var key = cookie.substring(0, cookie.indexOf('='));
				result[key] = decodeURIComponent(cookie.substring(cookie.indexOf('=') + 1, cookie.length));
			}
			return result;
		}
	},
	/**
	 *
	 * @param name
	 * @param value
	 * @param options
	 */
	set: function (name, value, options) {
		options = options || {};
		if (options.path === undefined) {
			options.path = '/';
		}
		var expires = options.expires;
		if (typeof expires === 'number' && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}
		value = encodeURIComponent(value);
		var cookie = name + '=' + value;
		for (var property_name in options) {
			cookie += ';' + property_name;
			if (options.hasOwnProperty(property_name)) {
				var property_value = options[property_name];
				if (property_value !== true) {
					cookie += '=' + property_value;
				}
			}
		}
		document.cookie = cookie;
	},
	/**
	 *
	 * @param name
	 * @param options
	 */
	delete: function (name, options) {
		options = options || {};
		options.expires = -1;
		this.set(name, '', options);
	}
};
