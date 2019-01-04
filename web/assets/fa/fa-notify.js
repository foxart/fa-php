/*
 * foxart.org
 */
'use strict';
Fa.NotifySettings = {
	name: 'faNotify',
	container: 'container',
	content: 'content',
	title: 'title',
	close: 'close'
};
Fa.NotifyCss = {
	notify: {
		'position': 'fixed',
		'display': 'none',
		'font-size': '13px',
		'line-height': '13px',
		'z-index': 9999
	},
	container: {
		'position': 'relative',
		'display': 'block',
		'padding': '6px',
		'font-size': '1em',
		'line-height': '1em',
		'background-color': '#434857',
		'border-radius': '6px',
		'box-shadow': '0 0 30px #000000'
	},
	content: {
		'position': 'relative',
		'display': 'block',
		'margin': '6px',
		'padding': '6px',
		'word-break': 'break-all',
		'color': 'white'
	},
	title: {
		'position': 'absolute',
		'display': 'block',
		'top': '3px',
		'left': '3px',
		'font-size': '0.8em',
		'line-height': '1em',
		'color': 'white'
	},
	close: {
		'position': 'absolute',
		'display': 'block',
		'top': '3px',
		'right': '3px',
		'font-size': '0.8em',
		'line-height': '1em',
		'text-decoration': 'none',
		'color': 'white'
	}
};
Fa.NotifyOptions = {
	'position': 'top-right',
	'margin': '6px',
	'width': 'auto',
	'content': '&nbsp;',
	'title': '&nbsp;',
	'close': '&times;',
	'autohide': true,
	'timeout': 1000,
	'content_callback': undefined,
	'show_callback': undefined,
	'show_delay': 150,
	'hide_callback': undefined,
	'hide_delay': 150,
	'update_delay': 75
};
/**
 *
 * @param id
 * @param options
 * @returns {*}
 * @constructor
 */
Fa.Notify = function (id, options) {
	var context;
	if (this instanceof Fa.Notify === false) {
		context = new Fa.Notify(id, options);
	} else {
		context = this;
		this.handleParameters(id, options);
		if (this.getDom(this.id).exist() === false) {
			this.create();
			this.show();
			this.getDom(this.id, Fa.NotifySettings.close).on('click', function () {
				context.hide();
			});
			/* autohide */
			if (context.options.autohide === true) {
				setTimeout(function () {
					context.hide();
				}, this.options.timeout)
			}
		} else {
			this.content(this.options.content);
		}
	}
	return context;
};
/**
 *
 * @param id
 * @param options
 */
Fa.Notify.prototype.handleParameters = function (id, options) {
	if (typeof id === 'object') {
		options = id;
		id = undefined;
	}
	if (id === undefined) {
		this.id = Fa.uniqueId();
	} else {
		this.id = id;
	}
	if (options === undefined) {
		this.options = Object.assign({}, Fa.NotifyOptions);
	} else {
		this.options = Object.assign({}, Fa.NotifyOptions, options)
	}
};
/**
 *
 * @returns {*|string}
 */
Fa.Notify.prototype.getName = function () {
	var result = Array.from(arguments);
	result.unshift(Fa.NotifySettings.name);
	return result.join('-');
};
/**
 *
 * @returns {Fa.Dom}
 */
Fa.Notify.prototype.getDom = function () {
	var result = Array.from(arguments);
	result.unshift('#' + Fa.NotifySettings.name);
	return Fa.Dom(result.join('-'));
};
/**
 *
 * @param id
 * @returns {*}
 */
Fa.Notify.prototype.getPosition = function (id) {
	var result;
	var attribute = this.getDom(id).attribute('class');
	switch (attribute) {
		case this.getName('top-left'):
			result = 'top-left';
			break;
		case this.getName('top-right'):
			result = 'top-right';
			break;
		case this.getName('bottom-left'):
			result = 'bottom-left';
			break;
		case this.getName('bottom-right'):
			result = 'bottom-right';
			break;
		default:
			// throw new Fa.Exception('undefined position from class', attribute);
			result = 'top-right';
	}
	return result;
};
/*
 * todo: fix error here
 */
/**
 *
 * @param position
 * @returns {*}
 */
Fa.Notify.prototype.getDirection = function (position) {
	var result;
	// console.log(position);
	switch (position) {
		case 'top-left':
			result = 'top';
			break;
		case 'top-right':
			result = 'top';
			break;
		case 'bottom-left':
			result = 'bottom';
			break;
		case 'bottom-right':
			result = 'bottom';
			break;
		default:
			// throw new Fa.Exception('undefined direction from position', position);
			result = 'top';
	}
	return result;
};
Fa.Notify.prototype.getCss = function (parent, position) {
	var result = {};
	var dom = {};
	if (parent === undefined) {
		dom.element = null;
	} else {
		dom = this.getDom(parent);
		// console.log(element);
	}
	switch (position) {
		case 'top-left':
			result = {
				'top': dom.element === null ? '0px' : parseFloat(dom.css('top')) + parseFloat(dom.css('margin-top')) + parseFloat(dom.css('height')) + 'px',
				'left': '0px',
				'margin-top': Fa.NotifyOptions.margin,
				'margin-left': Fa.NotifyOptions.margin
			};
			break;
		case 'top-right':
			result = {
				'top': dom.element === null ? '0px' : parseFloat(dom.css('top')) + parseFloat(dom.css('margin-top')) + parseFloat(dom.css('height')) + 'px',
				'right': '0px',
				'margin-top': Fa.NotifyOptions.margin,
				'margin-right': Fa.NotifyOptions.margin
			};
			break;
		case 'bottom-left':
			result = {
				'bottom': dom.element === null ? '0px' : parseFloat(dom.css('bottom')) + parseFloat(dom.css('margin-bottom')) + parseFloat(dom.css('height')) + 'px',
				'left': '0px',
				'margin-bottom': Fa.NotifyOptions.margin,
				'margin-left': Fa.NotifyOptions.margin
			};
			break;
		case 'bottom-right':
			result = {
				'bottom': dom.element === null ? '0px' : parseFloat(dom.css('bottom')) + parseFloat(dom.css('margin-bottom')) + parseFloat(dom.css('height')) + 'px',
				'right': '0px',
				'margin-bottom': Fa.NotifyOptions.margin,
				'margin-right': Fa.NotifyOptions.margin
			};
			break;
		default:
			result = {
				'top': dom.element === null ? '0px' : parseFloat(dom.css('top')) + parseFloat(dom.css('margin-top')) + parseFloat(dom.css('height')) + 'px',
				'right': '0px',
				'margin-top': Fa.NotifyOptions.margin,
				'margin-right': Fa.NotifyOptions.margin
			};
	}
	return result;
};
/* CREATE */
Fa.Notify.prototype.create = function () {
	Fa.Dom('body').append(
		Fa.Dom('div').attribute('id', this.getName(this.id)).addClass(this.getName(this.options.position)).append(
			Fa.Dom('div').attribute('id', this.getName(this.id, Fa.NotifySettings.container)).css(Fa.NotifyCss.container).append(
				Fa.Dom('div').attribute('id', this.getName(this.id, Fa.NotifySettings.content)).css(Fa.NotifyCss.content).html(
					this.options.content
				)
			).append(
				Fa.Dom('span').attribute({
					'id': this.getName(this.id, Fa.NotifySettings.title)
				}).css(Fa.NotifyCss.title).html(
					this.options.title
				)
			).append(
				Fa.Dom('a').attribute({
					'id': this.getName(this.id, Fa.NotifySettings.close),
					'href': '#'
				}).css(Fa.NotifyCss.close).html(
					this.options.close
				)
			)
		).css(Fa.NotifyCss.notify).css({
			'width': this.options.width
		})
	);
};
/**
 *
 * @param content
 * @returns {Fa.Notify}
 */
Fa.Notify.prototype.content = function (content) {
	// var context = this;
	var data = Fa.getData(Fa.NotifySettings.name);
	var position = this.getPosition(this.id);
	var list = [];
	this.getDom(this.id, Fa.NotifySettings.content).html(content);
	// this.getDom(this.id, Fa.NotifySettings.content).fadeOut(function () {
	// 	context.getDom(context.id, Fa.NotifySettings.content).html(content);
	// 	context.getDom(context.id, Fa.NotifySettings.content).fadeIn();
	// });
	// this.contentCallback();
	if (data[position] !== undefined) {
		list = data[position].slice();
	}
	var index = list.indexOf(this.id);
	if (index < list.length - 1) {
		this.update(list[index], list.slice(index + 1, list.length), position);
	}
	return this;
};
// Fa.Notify.prototype.contentCallback = function () {
// 	if (this.options.content_callback !== undefined) {
// 		this.options.content_callback.apply(this);
// 	}
// };
/* SHOW */
Fa.Notify.prototype.show = function () {
	var context = this;
	var data = Fa.getData(Fa.NotifySettings.name);
	var position = this.getPosition(this.id);
	if (data[position] === undefined) {
		data[position] = [];
	}
	var css = this.getCss(data[position][data[position].length - 1], position);
	/*
	data
	 */
	data[position].push(this.id);
	this.getDom(this.id).css(css);
	Fa.setData(Fa.NotifySettings.name, data);
	this.getDom(this.id).fadeIn(this.options.show_delay, function () {
		context.showCallback();
	});
};
Fa.Notify.prototype.showCallback = function () {
	if (this.options.show_callback !== undefined) {
		this.options.show_callback.apply(this);
	}
};
/* HIDE */
Fa.Notify.prototype.hide = function () {
	var context = this;
	if (this.getDom(this.id).exist() === true) {
		var data = Fa.getData(Fa.NotifySettings.name);
		var position = this.getPosition(this.id);
		var list = [];
		if (data[position] !== undefined) {
			list = data[position].slice();
		}
		data[position].splice(data[position].indexOf(context.id), 1);
		Fa.setData(Fa.NotifySettings.name, data);
		this.getDom(this.id).fadeOut(this.options.hide_delay, function () {
			context.getDom(context.id).remove();
			var index = list.indexOf(context.id);
			if (index < list.length - 1) {
				context.update(list[index - 1], list.slice(index + 1, list.length), position);
			}
			context.hideCallback();
		});
	}
};
Fa.Notify.prototype.hideCallback = function () {
	if (this.options.hide_callback !== undefined) {
		this.options.hide_callback.apply(this);
	}
};
/* UPDATE */
Fa.Notify.prototype.update = function (next, data, position) {
	var context = this;
	var direction = context.getDirection(position);
	var css = this.getCss(next, position);
	if (this.getDom(data[0]).exist() === true) {
		this.getDom(data[0]).animate(direction, css[direction], this.options.update_delay, function () {
			next = data[0];
			data.splice(0, 1);
			if (data.length > 0) {
				context.update(next, data);
			}
		});
	}
};
