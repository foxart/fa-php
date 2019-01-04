/**
 * Created by ikosenko on 20-11-2017.
 */
'use strict';
Fa.LoaderSettings = {
	name: 'bak-loader',
	background: 'background',
	container: 'container',
	content: 'content',
	loader: 'loader'
};
Fa.LoaderCss = {
	background: {
		'position': 'fixed',
		'display': 'none',
		'top': '0px',
		'left': '0px',
		'background-color': '#000',
		'opacity': 0.5,
		'z-index': 9999
	},
	container: {
		'position': 'fixed',
		'display': 'none',
		'top': '0px',
		'left': '0px',
		'z-index': 9999
	},
	content: {
		'position': 'relative',
		'display': 'table-cell',
		'text-align': 'center',
		'vertical-align': 'middle'
	},
	loader: {
		'position': 'relative',
		'display': 'inline-block',
		'border-radius': '50%',
		'border-style': 'solid',
		'border-color': 'rgba(255,255,255, 0.2)',
		'border-top-color': 'rgb(255,255,255)',
		'animation': 'bak-loader-spin 1s infinite linear'
	}
};
Fa.LoaderOptions = {
	'animation': '@keyframes bak-loader-spin {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}',
	// 'timeout': 1000,
	'callback': undefined
};
/**
 *
 * @param selector
 * @param options
 * @returns {*}
 * @constructor
 */
Fa.Loader = function (selector, options) {
	var context;
	if (this instanceof Fa.Loader === false) {
		context = new Fa.Loader(selector, options);
	} else {
		context = this;
		this.handleParameters(selector, options);
		// if (this.getDom().exist() === false) {
		// 	Fa.Dom('body').append(
		// 		Fa.Dom('style').attribute({
		// 			'id': this.getName(),
		// 			'type': 'text/css'
		// 		}).html(Fa.LoaderOptions.animation)
		// 	);
		// }
		// if (Fa.Dom(this.selector).isNode(Fa.Dom(this.selector).element) === true) {
		// 	if (Fa.Dom(this.selector).attribute(context.getName()) === null) {
		// 		context.create(this.selector);
		// 	}
		// } else {
		// 	Fa.Dom(this.selector).manipulateElement(function (target) {
		// 		if (Fa.Dom(target).attribute(context.getName()) === null) {
		// 			context.create(target);
		// 		}
		// 	});
		// }
	}
	return context;
};
Fa.Loader.prototype.handleParameters = function (selector, options) {
	if (typeof selector === 'object') {
		options = selector;
		selector = undefined;
	}
	if (selector === undefined) {
		this.selector = 'body';
	} else {
		this.selector = selector;
	}
	if (options === undefined) {
		this.options = Object.assign({}, Fa.LoaderOptions);
	} else {
		this.options = Object.assign({}, Fa.LoaderOptions, options)
	}
};
Fa.Loader.prototype.getName = function () {
	var result = Array.from(arguments);
	result.unshift(Fa.LoaderSettings.name);
	return result.join('-');
};
Fa.Loader.prototype.getDom = function () {
	var result = Array.from(arguments);
	result.unshift('#' + Fa.LoaderSettings.name);
	return Fa.Dom(result.join('-'));
};
/* SHOW */
Fa.Loader.prototype.create = function (target) {
	var context = this;
	var id = Fa.uniqueId();
	// var id = this.selector;
	var size = Math.min(parseFloat(Fa.Dom(target).css('width')), parseFloat(Fa.Dom(target).css('height')));
	Fa.Dom(target).attribute(context.getName(), id).append(
		Fa.Dom('div').attribute('id', context.getName(id, Fa.LoaderSettings.background)).css(Fa.LoaderCss.background).css({
			'width': Fa.Dom(target).css('width'),
			'height': Fa.Dom(target).css('height')
		})
	).append(
		Fa.Dom('div').attribute('id', context.getName(id)).css(Fa.LoaderCss.container).css({
			'width': Fa.Dom(target).css('width'),
			'height': Fa.Dom(target).css('height')
		}).append(
			Fa.Dom('div').attribute('id', context.getName(id, Fa.LoaderSettings.content)).css(Fa.LoaderCss.content).append(
				Fa.Dom('span').attribute('id', context.getName(id, Fa.LoaderSettings.loader)).css(Fa.LoaderCss.loader).css({
					'width': size / 2 + 'px',
					'height': size / 2 + 'px'
				}).css('border-width', size / 10 + 'px')
			)
		)
	);
	/* show */
	context.getDom(id, Fa.LoaderSettings.background).show(function () {
		context.getDom(id).css('display', 'table');
		context.callback();
	});
};
/**
 * BLOCK
 */
Fa.Loader.prototype.block = function () {
	var context = this;
	if (this.getDom().exist() === false) {
		Fa.Dom('body').append(
			Fa.Dom('style').attribute({
				'id': this.getName(),
				'type': 'text/css'
			}).html(Fa.LoaderOptions.animation)
		);
	}
	if (Fa.Dom(this.selector).isNode(Fa.Dom(this.selector).element) === true) {
		if (Fa.Dom(this.selector).attribute(context.getName()) === null) {
			context.create(this.selector);
		}
	} else {
		Fa.Dom(this.selector).manipulateElement(function (target) {
			if (Fa.Dom(target).attribute(context.getName()) === null) {
				context.create(target);
			}
		});
	}
};
/**
 * UNBLOCK
 */
Fa.Loader.prototype.unblock = function () {
	var context = this;
	var id;
	if (Fa.Dom(this.selector).isNode(Fa.Dom(this.selector).element) === true) {
		id = Fa.Dom(this.selector).attribute(context.getName());
		context.getDom(id, Fa.LoaderSettings.background).remove();
		context.getDom(id).remove();
		Fa.Dom(context.selector).element.removeAttribute(context.getName());
	} else {
		Fa.Dom(this.selector).manipulateElement(function (target) {
			id = Fa.Dom(target).attribute(context.getName());
			context.getDom(id, Fa.LoaderSettings.background).remove();
			context.getDom(id).remove();
			Fa.Dom(context.selector).element.removeAttribute(context.getName());
		});
	}
};
/* */
Fa.Loader.prototype.callback = function () {
	if (this.options.callback !== undefined) {
		this.options.callback.apply(this);
	}
};
