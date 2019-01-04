'use strict';
(function () {
	/**
	 *
	 * @param search
	 * @param replace
	 * @param subject
	 * @returns {*}
	 */
	Fa.replace = function (search, replace, subject) {
		var replace_string;
		if (typeof search === 'string') {
			return subject.split(search).join(replace);
		} else {
			search.map(function (element, key) {
				if (replace[key] === undefined) {
					replace_string = 'undefined'
				} else {
					replace_string = replace[key];
				}
				subject = subject.split(element).join(replace_string);
			});
		}
		return subject;
	};
	/**
	 *
	 * @param target
	 * @param source
	 */
	Fa.merge = function (target, source) {
		var output = Object.assign.apply({}, target);
		if (Fa.isObject(target) && Fa.isObject(source)) {
			Object.keys(source).forEach(function (key) {
				var value = {};
				value[key] = source[key];
				if (Fa.isObject(source[key])) {
					if (!(key in target)) {
						Object.assign(output, value);
					} else {
						output[key] = Fa.merge(target[key], source[key]);
					}
				} else {
					Object.assign(output, value);
				}
			});
		}
		return output;
	};
})();
