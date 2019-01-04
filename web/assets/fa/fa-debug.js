/*
 * foxart.org
 */
'use strict';
Fa.DebugSettings = {
	name: 'faDebug',
	container_id: 'container',
	console_id: 'console',
	header_id: 'header',
	body_id: 'body',
	footer_id: 'footer',
	button_maximize_id: 'button-maximize',
	button_clear_id: 'button-clear',
	button_scroll_id: 'button-scroll',
	button_minimize_id: 'button-minimize',
	button_exit_id: 'button-exit',
	/* input */
	input_id: 'input',
	input_textarea_id: 'input-textarea',
	input_button_show_id: 'input-button-show',
	input_button_hide_id: 'input-button-hide',
	input_button_run_id: 'input-button-run'
};
Fa.DebugCss = {
	font: {
		'font-size': '13px',
		'line-height': '1.5',
		'font-weight': '300',
		'font-family': 'DejaVu Sans Mono, monospace'
	},
	wrapper: {
		'position': 'relative',
		'overflow': 'hidden',
		'margin': '9px'
	},
	table: {
		'position': 'relative',
		'display': 'table',
		'width': '100%',
		'height': '100%',
		'border-collapse': 'collapse'
	},
	table_row: {
		'position': 'relative',
		'display': 'table-row'
	},
	table_cell: {
		'position': 'relative',
		'display': 'table-cell'
	},
	/**/
	container: {
		'position': 'fixed',
		'display': 'block',
		'width': '50%',
		'height': '100%',
		'top': 0,
		'right': 0,
		'background-color': '#252830',
		'border-radius': '9px',
		'box-shadow': '0 0 30px #000000',
		'opacity': 0.95,
		'z-index': 16777271
	},
	header: {
		'position': 'relative',
		'overflow': 'hidden',
		// 'background-color': '#434857',
		'border-radius': '9px 9px 0px 0px'
	},
	body: {
		'position': 'relative',
		'width': '100%',
		'height': '100%',
		'overflow': 'auto'
	},
	footer: {
		'position': 'relative',
		'overflow': 'hidden',
		// 'background-color': '#434857',
		'border-radius': '0px 0px 9px 9px'
	},
	log: {
		'position': 'relative',
		'display': 'block',
		'margin-bottom': '9px',
		'padding': '6px',
		'word-break': 'break-all',
		// 'color': '#000000',
		// 'background-color': '#cfd2da',
		'color': '#ffffff',
		'background-color': '#000000',
		'border-radius': '3px'
	},
	message: {
		'position': 'relative',
		'display': 'block',
		'margin-bottom': '9px',
		'padding': '6px',
		'word-break': 'break-all',
		'font-style': 'italic',
		'text-shadow': '1px 1px 0px #000, 3px 3px 0px #666',
		'color': '#cfd2da',
		'background-color': '#434857',
		'border-radius': '3px'
	},
	maximize: {
		'position': 'fixed',
		'display': 'none',
		'top': '9px',
		'right': '9px',
		'z-index': 16777271
	},
	/* button */
	button: {
		'position': 'relative',
		'display': 'block',
		'padding': '3px 6px',
		'text-decoration': 'none',
		'border-radius': '0.25em'
	},
	/* button position */
	button_left: {
		'float': 'left',
		'margin-right': '6px'
	},
	button_right: {
		'float': 'right',
		'margin-left': '6px'
	},
	/* button color */
	button_primary: {
		'color': '#ffffff',
		'background-color': '#007bff'
	},
	button_secondary: {
		'color': '#ffffff',
		'background-color': '#868e96'
	},
	button_success: {
		'color': '#ffffff',
		'background-color': '#28a745'
	},
	button_danger: {
		'color': '#ffffff',
		'background-color': '#dc3545'
	},
	button_warning: {
		'color': '#000000',
		'background-color': '#ffc107'
	},
	button_info: {
		'color': '#ffffff',
		'background-color': '#17a2b8'
	},
	button_light: {
		'color': '#000000',
		'background-color': '#f8f9fa'
	},
	button_dark: {
		'color': '#ffffff',
		'background-color': '#343a40'
	},
	/* input */
	input: {
		'position': 'relative',
		'display': 'block',
		'padding-bottom': '9px'
	},
	input_textarea: {
		'position': 'relative',
		'display': 'block',
		'padding': '9px',
		'width': '100%',
		'border-radius': '0.25em'
	}
};
Fa.Debug = {
	systemConsoleLog: console.log,
	systemConsoleClear: console.clear,
	options: {},
	callback: {},
	getName: function () {
		var result = Array.from(arguments);
		result.unshift(Fa.DebugSettings.name);
		return result.join('-');
	},
	getDom: function () {
		var result = Array.from(arguments);
		result.unshift('#' + Fa.DebugSettings.name);
		return Fa.Dom(result.join('-'));
	},
	createContainer: function () {
		Fa.Dom('body').append(
			Fa.Dom('div').attribute('id', this.getName()).css(Fa.DebugCss.font).append(
				Fa.Dom('a').attribute('id', this.getName(Fa.DebugSettings.button_maximize_id)).attribute({
					id: this.getName(Fa.DebugSettings.button_maximize_id),
					href: '#'
				}).html('maximize').css(Fa.DebugCss.button).css(Fa.DebugCss.button_info).css(Fa.DebugCss.maximize)
			).append(
				Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.container_id)).css(Fa.DebugCss.container).css('height', window.innerHeight + 'px').append(
					Fa.Dom('div').css(Fa.DebugCss.table).append(
						Fa.Dom('div').css(Fa.DebugCss.table_row).append(
							Fa.Dom('div').css(Fa.DebugCss.table_cell).append(
								/* header */
								Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.header_id)).css(Fa.DebugCss.header).append(
									Fa.Dom('div').css(Fa.DebugCss.wrapper).append(
										Fa.Dom('a').attribute({
											id: this.getName(Fa.DebugSettings.button_clear_id),
											href: '#'
										}).html('clear').css(Fa.DebugCss.button).css(Fa.DebugCss.button_primary).css(Fa.DebugCss.button_left)
									).append(
										Fa.Dom('a').attribute({
											id: this.getName(Fa.DebugSettings.button_scroll_id),
											href: '#'
										}).html('scroll').css(Fa.DebugCss.button).css(Fa.DebugCss.button_light).css(Fa.DebugCss.button_left)
									).append(
										Fa.Dom('a').attribute({
											id: this.getName(Fa.DebugSettings.button_exit_id),
											href: '#'
										}).html('exit').css(Fa.DebugCss.button).css(Fa.DebugCss.button_danger).css(Fa.DebugCss.button_right)
									).append(
										Fa.Dom('a').attribute({
											id: this.getName(Fa.DebugSettings.button_minimize_id),
											href: '#'
										}).html('minimize').css(Fa.DebugCss.button).css(Fa.DebugCss.button_info).css(Fa.DebugCss.button_right)
									)
								)
							)
						)
					).append(
						Fa.Dom('div').css(Fa.DebugCss.table_row).append(
							Fa.Dom('div').css(Fa.DebugCss.table_cell).css('height', '100%').append(
								/* body */
								Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.body_id)).css(Fa.DebugCss.body).append(
									Fa.Dom('div').css(Fa.DebugCss.wrapper).append(
										Fa.Dom('style').attribute('type', 'text/css').html('pre {white-space: pre-wrap;}')
									).append(
										Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.console_id))
									)
								)
							)
						)
					).append(
						Fa.Dom('div').css(Fa.DebugCss.table_row).append(
							Fa.Dom('div').css(Fa.DebugCss.table_cell).append(
								/* footer */
								Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.footer_id)).css(Fa.DebugCss.footer).append(
									Fa.Dom('div').css(Fa.DebugCss.wrapper).append(
										Fa.Dom('div').attribute('id', this.getName(Fa.DebugSettings.input_id)).css(Fa.DebugCss.input).css('display', 'none').append(
											Fa.Dom('textarea').attribute('id', this.getName(Fa.DebugSettings.input_textarea_id)).html(
												'console.log(\'hello world!\');'
												// 'console.log(this);'
											).css(Fa.DebugCss.input_textarea).css({
												'height': window.innerHeight / 5 + 'px'
											})
										)
									).append(
										Fa.Dom('div').css().append(
											Fa.Dom('a').attribute({
												id: this.getName(Fa.DebugSettings.input_button_show_id),
												href: '#'
											}).html('show console').css(Fa.DebugCss.button).css(Fa.DebugCss.button_info).css(Fa.DebugCss.button_left)
										).append(
											Fa.Dom('a').attribute({
												id: this.getName(Fa.DebugSettings.input_button_hide_id),
												href: '#'
											}).html('hide console').css(Fa.DebugCss.button).css(Fa.DebugCss.button_info).css(Fa.DebugCss.button_left).css('display', 'none')
										).append(
											Fa.Dom('a').attribute({
												id: this.getName(Fa.DebugSettings.input_button_run_id),
												href: '#'
											}).html('run').css(Fa.DebugCss.button).css(Fa.DebugCss.button_primary).css(Fa.DebugCss.button_right).css('display', 'none')
										)
									)
								)
							)
						)
					)
				)
			));
	},
	/* handle events */
	attachEvents: function () {
		var context = this;
		this.getDom(Fa.DebugSettings.button_maximize_id).on('click', function (event) {
			context.show();
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.button_minimize_id).on('click', function (event) {
			context.hide();
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.button_exit_id).on('click', function (event) {
			context.detach();
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.button_clear_id).on('click', function (event) {
			context.clear();
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.button_scroll_id).on('click', function (event) {
			if (Fa.Dom(this).hasClass(context.getName('checked')) === true) {
				Fa.Dom(this).removeClass(context.getName('checked')).css(Fa.DebugCss.button_light);
			} else {
				Fa.Dom(this).addClass(context.getName('checked')).css(Fa.DebugCss.button_dark);
			}
			context.scrollBottom();
			event.preventDefault();
		});
		/* console */
		this.getDom(Fa.DebugSettings.input_button_show_id).on('click', function (event) {
			context.getDom(Fa.DebugSettings.input_button_show_id).hide();
			context.getDom(Fa.DebugSettings.input_button_hide_id).show();
			context.getDom(Fa.DebugSettings.input_button_run_id).show();
			context.getDom(Fa.DebugSettings.input_id).show(function () {
				context.handleSize()
			});
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.input_button_hide_id).on('click', function (event) {
			context.getDom(Fa.DebugSettings.input_button_show_id).show();
			context.getDom(Fa.DebugSettings.input_button_hide_id).hide();
			context.getDom(Fa.DebugSettings.input_button_run_id).hide();
			context.getDom(Fa.DebugSettings.input_id).hide(function () {
				context.handleSize();
			});
			event.preventDefault();
		});
		this.getDom(Fa.DebugSettings.input_button_run_id).on('click', function (event) {
			var script = context.getDom(Fa.DebugSettings.input_textarea_id).value();
			context.message(script.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
			eval(script);
			event.preventDefault();
		});
	},
	/* actions */
	show: function () {
		var context = this;
		context.getDom(Fa.DebugSettings.button_maximize_id).hide(function () {
			context.getDom(Fa.DebugSettings.container_id).fadeIn(150);
		});
	},
	hide: function () {
		var context = this;
		context.getDom(Fa.DebugSettings.container_id).fadeOut(150, function () {
			context.getDom(Fa.DebugSettings.button_maximize_id).show();
		});
	},
	handleSize: function () {
		this.getDom(Fa.DebugSettings.body_id).css('height', window.innerHeight - parseFloat(this.getDom(Fa.DebugSettings.header_id).css('height')) - parseFloat(this.getDom(Fa.DebugSettings.footer_id).css('height')) + 'px');
	},
	scrollBottom: function () {
		if (this.getDom(Fa.DebugSettings.button_scroll_id).hasClass(this.getName('checked')) === true) {
			this.getDom(Fa.DebugSettings.body_id).scrollY('bottom');
		}
	},
	log: function (message) {
		// var time = new Date().toLocaleTimeString('en-US', {
		// 	hour12: false
		// });
		var context = this;
		// console.log(this.getDom());
		// console.log(this.getDom().exist());
		// if (this.getDom().exist() === false) {
		context.getDom(Fa.DebugSettings.console_id).append(
			// Fa.Dom('div').html(time + ' | ' + message).css(Fa.DebugCss.log)
			Fa.Dom('div').html(message).css(Fa.DebugCss.log)
		);
		context.scrollBottom();
		// }
	},
	message: function (message) {
		this.getDom(Fa.DebugSettings.console_id).append(
			Fa.Dom('div').html(message).css(Fa.DebugCss.message)
		);
	},
	clear: function () {
		var context = this;
		this.getDom(Fa.DebugSettings.console_id).fadeOut(150, function () {
			context.getDom(Fa.DebugSettings.console_id).clear();
			// context.getDom(Fa.DebugSettings.console_id).fadeIn(150, function () {
			// });
			context.getDom(Fa.DebugSettings.console_id).show(function () {
				context.message('Console was cleared');
			});
		});
	},
	attach: function (options) {
		var context = this;
		if (this.getDom().exist() === false) {
			if (options !== undefined) {
				if (options.onAttach !== undefined) {
					this.callback.onAttach = options.onAttach;
				}
				if (options.onDetach !== undefined) {
					this.callback.onDetach = options.onDetach;
				}
			}
			this.createContainer();
			this.attachEvents();
			// console.log = function () {
			// 	var messages = [];
			// 	while (arguments.length) {
			// 		messages.push(Fa.beautifyHtml([].shift.call(arguments)));
			// 		// messages.push([].shift.call(arguments));
			// 	}
			// 	context.log(messages.join(' '));
			// 	context.scrollBottom();
			// };
			// console.clear = function () {
			// 	context.clear();
			// };
			if (this.callback !== undefined) {
				if (this.callback.onAttach !== undefined) {
					this.callback.onAttach.apply(context);
				}
			}
			context.message('Console was initialized');
		} else {
			// console.error('already created');
		}
	},
	create: function (options) {
		var context = this;
		if (this.getDom().exist() === false) {
			if (options !== undefined) {
				if (options.onAttach !== undefined) {
					this.callback.onAttach = options.onAttach;
				}
				if (options.onDetach !== undefined) {
					this.callback.onDetach = options.onDetach;
				}
			}
			this.createContainer();
			this.attachEvents();
			if (this.callback !== undefined) {
				if (this.callback.onAttach !== undefined) {
					this.callback.onAttach.apply(context);
				}
			}
			context.message('Console was initialized');
		} else {
			console.error('already created');
		}
	},
	detach: function () {
		var context = this;
		console.log = this.systemConsoleLog;
		console.clear = this.systemConsoleClear;
		if (this.callback !== undefined) {
			if (this.callback.onDetach !== undefined) {
				this.callback.onDetach.apply(context);
			}
		}
		this.getDom().remove();
	}
};
// Fa.onDocumentLoad(function () {
// 	/* autoinitialize */
// 	var url = Fa.parseUrl();
// 	if (url.parameters['fadebug'] !== undefined) {
// 		if (url.parameters['fadebug'] === '1') {
// 			Fa.Cookie.set('bak-debug', 'on');
// 		} else if (url.parameters['fadebug'] === '0') {
// 			Fa.Cookie.delete('bak-debug');
// 		}
// 	}
// 	if (Fa.Cookie.get('bak-debug') === 'on') {
// 		Fa.Debug.attach({
// 			onAttach: function () {
// 			},
// 			onDetach: function () {
// 				Fa.Cookie.delete('bak-debug');
// 			}
// 		});
// 	}
// });
