/**
 * jQuery faConsole plugin
 * Version 1.1
 * Version control 13.04.2011, 31.07.2014
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * @copyright Ivan Kosenko @home http://foxart.org @mail ivan@foxart.org
 **/
(function ($) {
	$.fa_console = function () {
		var $browser = $._fa_get_browser();
		switch ($browser) {
			case 'Firefox':
				this.$level = 2;
				break;
			case 'Chrome':
				this.$level = 4;
				break;
			default:
				this.$level = 0;
		}
		;
		this.get_trace = function get_trace() {
			try {
				throw Error()
			} catch ($my_error) {
				switch ($browser) {
					case 'Firefox':
						$info = $my_error.stack.split('\n')[this.$level].split('/').slice(-1).pop().split(':');
						break;
					case 'Chrome':
						$info = $my_error.stack.split('\n')[this.$level].split('/').slice(-1).pop().slice(0, -1).split(':');
						break;
					default:
						$info = ['undefined', 'null', 'null'];
				}
				;
				var $result = {
					file: $info[0],
					line: $info[1],
					column: $info[2]
				};
				return $result;
			}
		};
		/** console **/
		$.fa_console_settings = {
			log_style: 'background: #808080; color: white;',
			log_line_style: 'background: #B3B3B3; color: white;',
			info_style: 'background: #0000FF; color: white;',
			info_line_style: 'background: #6666FF; color: white;',
			warn_style: 'background: #FFA500; color: white;',
			warn_line_style: 'background: #FFC966; color: white;',
			error_style: 'background: #FF0000; color: white;',
			error_line_style: 'background: #FF6666; color: white;',
			element_style: 'background: #808080; color: white;',
			reset_style: 'background: none;',
			template: {
				complex: '%c %s %c%c %s:%s %c %s <%s>',
				simple: '%c %s %c%c %s:%s %c %s %c %s ',
				complex_log: '%c %s %c%c %s:%s %c <%s>',
				simple_log: '%c %s %c%c %s:%s %c %s'
			}
		};
		this.error = function ($text, $element) {
			$message = $.extend({}, $.fa_console_settings, this.get_trace());
			if ($.type($element) == 'undefined') {
				$element = $text;
				$text = '/error/';
			}
			;
			if ($.type($element) == 'object' || $.type($element) == 'array') {
				console.groupCollapsed(
					$.fa_console_settings.template.complex,
					$message.error_style, $message.file, $message.reset_style, $message.error_line_style, $message.line, $message.column, $message.reset_style, $text, $.type($element)
				);
				$._fa_log_recursive($element);
				console.groupEnd();
			} else {
				console.error(
					$.fa_console_settings.template.simple,
					$message.error_style, $message.file, $message.reset_style, $message.error_line_style, $message.line, $message.column, $message.reset_style, $text, $message.error_style, $element
				);
			}
			;
		};
		this.info = function ($text, $element) {
			$message = $.extend({}, $.fa_console_settings, this.get_trace());
			if ($.type($element) == 'undefined') {
				$element = $text;
				$text = '/information/';
			}
			;
			if ($.type($element) == 'object' || $.type($element) == 'array') {
				console.groupCollapsed(
					$.fa_console_settings.template.complex,
					$message.info_style, $message.file, $message.reset_style, $message.info_line_style, $message.line, $message.column, $message.reset_style, $text, $.type($element)
				);
				$._fa_log_recursive($element);
				console.groupEnd();
			} else {
				console.info(
					$.fa_console_settings.template.simple,
					$message.info_style, $message.file, $message.reset_style, $message.info_line_style, $message.line, $message.column, $message.reset_style, $text, $message.info_style, $element
				);
			}
			;
		};
		this.warn = function ($text, $element) {
			$message = $.extend({}, $.fa_console_settings, this.get_trace());
			if ($.type($element) == 'undefined') {
				$element = $text;
				$text = '/warning/';
			}
			;
			if ($.type($element) == 'object' || $.type($element) == 'array') {
				console.groupCollapsed(
					$.fa_console_settings.template.complex,
					$message.warn_style, $message.file, $message.reset_style, $message.warn_line_style, $message.line, $message.column, $message.reset_style, $text, $.type($element)
				);
				$._fa_log_recursive($element);
				console.groupEnd();
			} else {
				console.warn(
					$.fa_console_settings.template.simple,
					$message.warn_style, $message.file, $message.reset_style, $message.warn_line_style, $message.line, $message.column, $message.reset_style, $text, $message.warn_style, $element
				);
			}
			;
		};
		this.log = function ($log) {
			$message = $.extend({}, $.fa_console_settings, $log, this.get_trace());
			if ($.type($log) == 'object' || $.type($log) == 'array') {
				console.groupCollapsed(
					$.fa_console_settings.template.complex_log,
					$message.log_style, $message.file, $message.reset_style, $message.log_line_style, $message.line, $message.column, $message.reset_style, $.type($log)
				);
				$._fa_log_recursive($log);
				console.groupEnd();
			} else {
				console.log(
					$.fa_console_settings.template.simple_log,
					$message.log_style, $message.file, $message.reset_style, $message.log_line_style, $message.line, $message.column, $message.reset_style, $log
				);
			}
			;
		};
		/** console **/
	};
	$._fa_get_browser = function () {
		var $result = 'Undefined browser';
		if (navigator.userAgent.search("MSIE") >= 0) {
			$result = 'Explorer';
			// var version = navigator.userAgent.substring(navigator.userAgent.search("MSIE") + 5, navigator.userAgent.search("; Windows"));
		} else if (navigator.userAgent.search("Chrome") >= 0) {
			$result = 'Chrome';
			// var version = navigator.userAgent.substring(navigator.userAgent.search("Chrome") + 7, navigator.userAgent.search(" Safari"));
		} else if (navigator.userAgent.search("Firefox") >= 0) {
			$result = 'Firefox';
			// var version = navigator.userAgent.substring(navigator.userAgent.search("Firefox") + 8);
		} else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
			$result = 'Safari';
			// var version = navigator.userAgent.substring(navigator.userAgent.search("Version") + 8, navigator.userAgent.search(" Safari"));
		} else if (navigator.userAgent.search("Opera") >= 0) {
			$result = 'Opera';
			var version = navigator.userAgent.substring(navigator.userAgent.search("Version") + 8);
		}
		;
		return $result;
	};
	$._fa_log_recursive = function ($variable, $name) {
		if ($.type($variable) == 'array' || $.type($variable) == 'object') {
			if ($.type($variable) == 'array') {
				if ($.type($name) != 'undefined') {
					console.group('[' + $name + ']');
				}
				;
			} else if ($.type($variable) == 'object') {
				if ($.type($name) != 'undefined') {
					console.group('{' + $name + '}');
				}
				;
			}
			;
			$.each($variable, function _fa_log_recursive_structure($key, $value) {
				if ($.type($key) == 'array' || $.type($key) == 'object') {
					$._fa_log_recursive($value, $key);
				} else if ($.type($value) == 'array' || $.type($value) == 'object') {
					$._fa_log_recursive($value, $key);
				} else {
					if ($.type($variable) == 'array') {
						console.log('[' + $key + '] - ' + $value);
					} else if ($.type($variable) == 'object') {
						console.log($key + ': ' + $value);
					} else {
						console.log($key + ', ' + $value);
					}
					;
				}
				;
			});
			console.groupEnd();
		} else {
			console.log($variable);
		}
		;
	};
})($);
