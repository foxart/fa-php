/**
 * jQuery faClass plugin
 * Version 1.1 (23:48 13.04.2011)
 * Version control 13.04.2011, 27.10.2011
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @copyright Ivan Kosenko @home http://foxart.org @mail ivan@foxart.org
 **/
// throw new Error();
// var bak = Error;
// bak.prototype.log = function ()
// {
// var args = Array.prototype.slice.call(arguments, 0),
// suffix = this.lineNumber ? 'line: '  + this.lineNumber : 'stack: ' + this.stack;
// console.log.apply(console, args.concat([suffix]));
// };
// bak.prototype.get_caller_line = function ()
// {
// return this.lineNumber;
// };
(function ($) {
	$.fa_inherit = function (Child, Parent) {
		(Child.prototype = Object.create(Child.superclass = Parent.prototype)).constructor = Child;
	};
	$.fa = function () {
		this.name = 'fa';
		/** allocate console **/
		this.allocate_console = function () {
			var $console;
			if ($.type($.fa_console) == 'function') {
				$console = new $.fa_console;
			} else {
				$console = console;
			}
			return $console;
		};
		this.get_object_size = function (object) {
			var size = 0, key;
			for (key in object) {
				if (object.hasOwnProperty(key)) {
					size++;
				}
			}
			return size;
		};
		/** data **/
		this.check_data = function ($name) {
			var $result = true;
			if ($.type($.data(document.body, $name)) == 'undefined') {
				$result = false;
			}
			return $result;
		};
		this.get_data = function ($name) {
			var $result = $.data(document.body, $name);
			return $result;
		};
		this.remove_data = function ($name, $key) {
			var $store_data = {};
			if (this.check_data($name) != false) {
				$store_data = this.get_data($name);
			}
			delete($store_data[$key]);
			$.data(document.body, $name, $store_data);
		};
		this.store_data = function ($name, $container, $data) {
			var $new_data = new Object();
			var $prev_data = this.get_data($name);
			$new_data[$container] = $data;
			$.data(document.body, $name, $.extend({}, $prev_data, $new_data));
		};
		this.load_data = function ($dom) {
			if ($.type($dom) == 'undefined') {
				$console = this.allocate_console();
				$console.$level = $console.$level + 1;
				$console.error('required parameter not set');
				return false;
			}
			var $result = new Object();
			$result = $($dom).data(this.name);
			return $result;
		};
		this.save_data = function ($dom, $data) {
			var $prev_data = new Object();
			var $new_data = new Object();
			$prev_data = $.data($dom, this.name);
			$($dom).data(this.name, $.extend($prev_data, $data));
		};
		/** data **/
		/** dom **/
		/* check existense of the dom element */
		this.check_dom = function ($dom) {
			var $result = true;
			if ($dom.length == 0) {
				$result = false;
			}
			return $result;
		};
		/* get unique value */
		this.get_random = function () {
			// return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			return Math.random().toString(36).substr(2, 9);
		};
		this.get_unique = function () {
			return this.get_random();
		};
		this.get_unique_id = function ($class) {
			return $class + '_' + this.get_unique();
		};
		/** dom **/
		/** dimensions **/
		/* get dimensions */
		this.get_dimension = function ($dom) {
			var $result = {
				'width': $dom.outerWidth(),
				'height': $dom.outerHeight()
				// 'width': $dom.width(),
				// 'height':	$dom.height()
			};
			return $result;
		};
		this.get_position = function ($dom) {
			var $result = {
				'top': $dom.offset().top,
				'left': $dom.offset().left
			};
			return $result;
		};
		this.get_bound = function ($dom) {
			var $result = {
				// 'top': $dom.offset().top,
				// 'left': $dom.offset().left
				// 'width': $dom.outerWidth(),
				// 'height':	$dom.outerHeight()
				'width': $dom.width(),
				'height': $dom.height()
			};
			return $result;
		};
		/** dimensions **/
	};
})($);
