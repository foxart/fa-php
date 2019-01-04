/*
 * foxart.org
 */
'use strict';
/**
 *
 * @type {{color: {default: string, primary: string, success: string, info: string, warning: string, danger: string}, systemConsoleLog: console.log, attach: Fa.Console.attach, detach: Fa.Console.detach, beautify: Fa.Console.beautify, log: Fa.Console.log}}
 */
Fa.Console = {
	// consoleLog: console.log.bind(console),
	color: {
		default: 'color: #ffffff',
		primary: 'color: #337ab7',
		success: 'color: #5cb85c',
		info: 'color: #5bc0de',
		warning: 'color: #d58512',
		danger: 'color: #d9534f'
	},
	systemConsoleLog: console.log,
	attach: function () {
		console.log = Fa.Console.log;
	},
	detach: function () {
		console.log = Fa.Console.systemConsoleLog;
	},
	log: function () {
		var time = new Date().toLocaleTimeString('en-US', {hour12: false});
		var color = Fa.Console.color;
		var messages = [];
		while (arguments.length) {
			messages.push(Fa.beautifyTxt([].shift.call(arguments)));
		}
		Fa.Console.systemConsoleLog.apply(this, ['%c' + time, color.primary, messages.join('\n')]);
	}
};
