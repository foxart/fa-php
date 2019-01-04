var static_clicks = [];
var dynamic_clicks = [];
var debug_search = '{$clicks}';
var debug_subject = 'clicks: {$clicks}';
Fa(function () {
	/*bind static event*/
	Fa('#context-menu .static').on('contextmenu', function (key) {
		static_clicks[key] = static_clicks[key] === undefined ? 1 : static_clicks[key] + 1;
		Fa(this).find('.status').html(Fa.replace(debug_search, static_clicks[key], debug_subject));
		return false;
	});
	/*bind dynamic event*/
	Fa('#context-menu').on('contextmenu', '.dynamic', function (key) {
		dynamic_clicks[key] = dynamic_clicks[key] === undefined ? 1 : dynamic_clicks[key] + 1;
		Fa(this).find('.status').html(Fa.replace(debug_search, dynamic_clicks[key], debug_subject));
		return false;
	});
		/*create dynamic elements*/
	setTimeout(function () {
		createDynamic('#context-menu');
	}, 250);
});