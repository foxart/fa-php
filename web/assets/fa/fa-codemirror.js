/**
 * Created by ikosenko on 24-04-2017.
 */

Fa.Codemirror = function (selector, options) {
	this.selector = selector;
	this.options = options;
	this.editor = CodeMirror.fromTextArea(document.getElementById(selector), options);
};
Fa.Codemirror.prototype = {
	editor: undefined,
	mode: undefined,
	clear: function () {
		this.editor.setValue('');
		this.editor.clearHistory();
		return this;
	},
	setMode: function (mode) {
		this.mode = mode;
		switch (mode) {
			case 'json':
				this.editor.setOption('mode', 'application/json');
				break;
			case 'html':
				this.editor.setOption('mode', 'htmlmixed');
				break;
			case 'http':
				this.editor.setOption('mode', 'http');
				break;
			case 'text':
				this.editor.setOption('mode', 'text/plain');
				break;
			case 'xml':
				this.editor.setOption('mode', 'application/xml');
				break;
			default:
				console.error('unsupported mode', mode);
				break;
		}
		return this;
	},
	getData: function () {
		return this.editor.getValue();
	},
	setData: function (data) {
		var $data;
		if (data === undefined || data === null) {
			$data = String(data);
		} else {
			$data = data;
		}
		this.editor.setValue($data);
		return this;
	},
	setSize: function (width, height) {
		this.editor.setSize(width, height);
		return this;
	},
	appendData: function (data) {
		var $data;
		if (data === undefined || data === null) {
			$data = String(data);
		} else {
			$data = data;
		}
		this.editor.replaceRange($data, CodeMirror.Pos(this.editor.lastLine()));
		return this;
	},
	refresh: function () {
		this.editor.refresh();
		return this;
	}
};
