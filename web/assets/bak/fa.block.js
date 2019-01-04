/**
 * jQuery faBlock plugin
 * Version 1.1 (23:48 13.04.2011)
 27.10.2011
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @copyright            Ivan Kosenko <ivan@foxart.org>
 * @home                http://foxart.org
 **/
(function ($) {
	/** 'bak' options **/ //remove to main class 'bak'
	$.fa_options = {
		block: {
			backgroundColor: 'blue',
			opacity: 0.1,
			zIndex: 300
		}
	};
	/** 'bak' options **/
	/** 'fa_block' options **/
	$.fa_block_options = {
		// content: 'block<br/>block',
		content: '<img alt="block" width="24px" height="24px" src="system/bak/fa_block.png"/>',
		errors: {
			data_not_found: 'data not found',
			dom_unblocked: 'dom is not blocked',
			dom_blocked: 'dom is alredy blocked',
			dom_not_found: 'dom not found'
		}
	};
	/** 'fa_block' **/
	$.fn.fa_block = function (options, callback) {
		/** 'fa_block' inherits class 'bak' **/
		$.fn.fa_block.superclass.constructor.apply(this, arguments);
		/** include console **/
		var $console = this.allocate_console();
		/** basic preparations **/
		var self = this;
		self.$dom = $(this);
		self.$error = {};
		// self.$data = self.data('fa_block');
		self.name = 'fa_block';
		self.css = $.extend({}, $.fa_block_options, options);
		/** define settings **/
		var $settings = {
			css: {
				common: {
					position: 'absolute',
					margin: '0px',
					padding: '0px',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				},
				container: {
					zIndex: $.fa_options.block.zIndex,
					border: 'dotted 1px',
				},
				background: {
					backgroundColor: $.fa_options.block.backgroundColor,
					color: $.fa_options.block.color,
					opacity: $.fa_options.block.opacity,
					zIndex: $.fa_options.block.zIndex + 1
				},
				content: {
					zIndex: $.fa_options.block.zIndex + 2
				}
			},
		};
		/** check dom exist **/
		if (self.check_dom(self.$dom) == false) {
			self.$error.dom_not_found = true;
		}
		;
		/** check dom alredy blocked **/
		if ($.type(self.load_data(self.$dom)) == 'object') {
			self.$error.dom_blocked = true;
		}
		;
		/** handle errors **/
		if (self.get_object_size(self.$error) != 0) {
			for ($key in self.$error) {
				$console.error($.fa_block_options.errors[$key], self.$dom.selector);
			}
			;
			self.$error = {};
			return false;
		} else {
			// $console.info('blocking', self.$dom.selector);
		}
		;
		this.setup = function ($dom) {
			// console.log('start setup');
			// $console.log($settings);
			/** process settings **/
			self.css.inherited = $.extend({}, $.fa_block_options, options);
			// var inherited = $.extend({},$.fa_block_options, options);
			self.css.container = $.extend(
				{},
				$settings.css.common,
				$settings.css.container
			);
			self.css.background = $.extend(
				{},
				$settings.css.common,
				$settings.css.background,
				{
					backgroundColor: self.css.inherited.backgroundColor,
					opacity: self.css.inherited.opacity
				}
			);
			self.css.content = $.extend(
				{},
				$settings.css.common,
				$settings.css.content,
				{
					color: self.css.inherited.color
				}
			);
			// $console.log(css_content);
		};
		var content = $.extend({}, $.fa_block_options, options);
		// $console.log(content);
		this.create = function ($dom) {
			// console.log('start create');
			// console.log(self.css.inherited);
			// console.log($dom);
			self.container = $('<div>').attr('id', $id + '_container');
			self.container_background = $('<span>').attr('id', $id + '_background');
			self.container_content = $('<span>').attr('id', $id + '_content');
			$dom.append(self.container.append(self.container_background).append(self.container_content.append(self.css.inherited.content)));
			if ($dom.css('position') == 'static') {
				$dom.css('position', 'relative');
			}
			;
		};
		this.decorate = function ($dom) {

			// console.log(self.container);
			self.container.css(self.css.container);
			$console.log(self.css.container);
			self.container_background.css(self.css.background);
			/** calculate containers bounds **/
			var bound_container = self.get_bound(self.container);
			var bound_content = self.get_bound(self.container_content);
			// console.log(self.container_content);
			// console.log(bound_container);
			// console.log(bound_content);
			// console.log(bound_container.width/2 - bound_content.width/2);
			self.container_content.css(
				$.extend(
					self.css_content,
					{
						border: 'solid 1px',
						// width: 'auto',
						// height: 'auto',
						// top: bound_container.height/2 - bound_content.height/2,
						// left: bound_container.width/2 - bound_content.width/2
					}
				)
			);
			return;
		};
		// this.each(function()
		self.$dom.each(function () {
			$id = self.get_unique_id('fa_block');
			$element = $(this);
			self.$dom.addClass('_blocked');
			$data = {
				id: $element.attr('id'),
				blocked: true,
				container: $id,
				position: $element.css('position'),
				dummy: null
				// selector: self.$dom.selector
				// selector: $element.selector
			};
			self.save_data($element, $data);
			self.setup($element);
			self.create($element);
			self.decorate($element);
		});
		return;
		/** process settings **/
		var inherited = $.extend({}, $.fa_block_options, options);
		var css_container = $.extend(
			{}, $settings.css.common, $settings.css.container
		);
		var css_background = $.extend(
			{}, $settings.css.common, $settings.css.background, {backgroundColor: inherited.backgroundColor, opacity: inherited.opacity}
		);
		var css_content = $.extend(
			{}, $settings.css.common, $settings.css.content, {color: inherited.color}
		);
		/** create containers **/
		var $id = self.get_unique_id('fa_block');
		var container = $('<div>').attr('id', $id + '_container');
		var container_background = $('<span>').attr('id', $id + '_background');
		var container_content = $('<span>').attr('id', $id + '_content');
		$dom.append(container.append(container_background).append(container_content.append(inherited.content)));
		if ($dom.css('position') == 'static') {
			$dom.css('position', 'relative');
		}
		;
		/** remember blocked **/
		self.store_data('fa_block', $dom.attr('id'), {'blocked': container.attr('id'), 'position': $dom.css('position')});
		/** stylize containers **/
		container.css(css_container);
		container_background.css(css_background);
		/** calculate containers bounds **/
		var bound_container = self.get_bound(container);
		var bound_content = self.get_bound(container_content);
		container_content.css(
			$.extend(
				css_content,
				{
					width: 'auto',
					height: 'auto',
					top: bound_container.height / 2 - bound_content.height / 2,
					left: bound_container.width / 2 - bound_content.width / 2
				}
			)
		);
		// $console.log(css_content);
		// $console.log(container_content);
		/** handle callbacks **/
		$.when(
			// function()
			// {
			// self.log('block_start');
			// }
		).then(function () {
				if (typeof callback == 'function') {
					callback(self);
				}
				;
			}
		);
	};
	/** 'fa_block' inherits class 'bak' **/ $.fa_inherit($.fn.fa_block, $.fa);
	$.fn.fa_unblock = function (options, callback) {
		/** 'fa_block_get_blocked' inherits class 'bak' **/ $.fn.fa_unblock.superclass.constructor.apply(this);
		/** include console **/
		var $console = this.allocate_console();
		/** basic preparations **/
		// var self = this;
		// var $dom = $(self);
		// var $error = {};
		/** basic preparations **/
		var self = this;
		self.$dom = $(this);
		self.$error = {};
		self.$data = self.data('fa_block');
		self.name = 'fa_block';
		self.css = $.extend({}, $.fa_block_options, options);
		/** check errors **/
		if (self.check_dom(self.$dom) == false) {
			self.$error.dom_not_found = true;
		}
		;
		/** check dom alredy blocked **/
		if ($.type(self.load_data(self.$dom)) != 'object') {
			self.$error.dom_unblocked = true;
		}
		;
		/** handle errors **/
		if (self.get_object_size(self.$error) != 0) {
			for ($key in self.$error) {
				$console.error($.fa_block_options.errors[$key], self.$dom.selector);
			}
			;
			self.$error = {};
			return false;
		} else {
			$console.info('unblocking', self.$dom.selector);
			// $('#' + $stored_data[self.$dom.attr('id')].blocked).remove();
			// self.remove_data('fa_block', self.$dom.attr('id'));
		}
		;
		self.$dom.each(function () {
			$console.log(self.$dom.data());
			self.$dom.removeData(self.name);
			$console.log(self.$dom.data());
			// $console.log($.data(self.$dom));
			// self.$dom.data(self.name, null);
			// $console.log(self.load_data(self.$dom));
		});
		return;
		console.log(self.$error.dom_unblocked);
		console.log($.type(self.load_data(self.$dom)));
		console.log(self.load_data(self.$dom));
	};
	/** 'fa_unblock' inherits class 'bak' **/ $.fa_inherit($.fn.fa_unblock, $.fa);
	$.fa_block = function (options, callback) {
		/** 'fa_block' inherits class 'bak' **/ $.fa_block.superclass.constructor.apply(this);
		var $console = this.allocate_console();
		var self = this;
		if ($.type(options) == 'undefined') {
			$console.error('required parameters not set');
			return false;
		}
		;
		$(options).fa_block();
	};
	/** 'fa_block' inherits class 'bak' **/ $.fa_inherit($.fa_block, $.fa);
	$.fa_unblock = function (options, callback) {
		/** 'fa_unblock' inherits class 'bak' **/ $.fa_unblock.superclass.constructor.apply(this);
		var $console = this.allocate_console();
		var self = this;
		if ($.type(options) == 'undefined') {
			$console.error('required parameters not set');
			return false;
		}
		;
		$(options).fa_unblock();
	};
	/** 'fa_block' inherits class 'bak' **/
	$.fa_inherit($.fa_unblock, $.fa);
	$.fa_block_get_blocked = function () {
		/** 'fa_block_get_blocked' inherits class 'bak' **/ $.fa_block_get_blocked.superclass.constructor.apply(this);
		var self = this;
		return self.get_data('fa_block');
	};
	/** 'fa_block_get_blocked' inherits class 'bak' **/ $.fa_inherit($.fa_block_get_blocked, $.fa);
})($);
