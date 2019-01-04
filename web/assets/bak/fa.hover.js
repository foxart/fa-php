/**
 * jQuery faBlock plugin
 * Version 1.1 (23:48 13.04.2011)
 * Version control 13.04.2011, 27.10.2011
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @copyright Ivan Kosenko @home http://foxart.org @mail ivan@foxart.org
 **/
(function ($) {
	/* BLOCK */
	$.faBlockOptions = {
		// content:				'<img alt="block" src="image/fa_ajax.png" style="width: 24px; height: 24px;"/>',
		content: '<div class="fa_block"/>',
		bgColor: '#000000',
		opacity: 0.5,
		position: 'absolute',
		zIndex: 300
	};
	$.fn.fa_hover = function (options, callback) {
		/** 'fa_hover' inherits class 'bak'    **/
		$.fn.fa_hover.superclass.constructor.apply(this);
		/** 'fa_hover' inherits class 'bak'    **/
		var self = this;
		if (self.check_dom(this) == false) {
			return false;
		}
		;
		if (!callback && typeof options == 'function') {
			callback = options
		}
		;
		// var a = $(this).next();
		// a.attr("id","cool");
		// console.log(this.get_unique());
		return this.livequery('mouseenter', function (e) {
			// self.console('hover');
		});
		alert(1);
		// $(this).next().hide();
		// $(this).next().prepend(this);
		return;
		var opt = $.extend({}, $.faBlockOptions, options);
		var id = $.fa_unique();
		opt.top = this.offset().top;
		opt.left = this.offset().left;
		if (!opt.width) {
			opt.width = this.outerWidth()
		}
		;
		if (!opt.height) {
			opt.height = this.outerHeight()
		}
		;
		var self_id = '_block_' + id;
		var block = $('<div>').attr('id', '_block_' + id);
		var bg = $('<div>').attr('id', '_block_bg_' + id).css({
			'top': opt.top,
			'left': opt.left,
			'width': opt.width,
			'height': opt.height,
			'background-color': opt.bgColor,
			'opacity': opt.opacity,
			'position': opt.position,
			'z-index': opt.zIndex - 1
		});
		var content = $(opt.content).attr('id', '_block_content_' + id).css({
			'position': opt.position,
			'top': opt.top + (opt.height / 2 - $(opt.content).outerHeight() / 2),
			'left': opt.left + (opt.width / 2 - $(opt.content).outerWidth() / 2),
			'z-index': opt.zIndex - 1
		});
		block.append(bg).append(content);
		$.data(this[0], '_block', self_id);
		$.when(
			$('body').append(block)
		).then(function () {
			if (typeof callback == 'function') {
				callback(self)
			}
		});
	};
	/** 'fa_hover' inherits class 'bak'    **/
	$.fa_inherit($.fn.fa_hover, $.fa);
	/** 'fa_hover' inherits class 'bak'    **/
})($);
