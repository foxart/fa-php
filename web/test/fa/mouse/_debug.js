var static_event1 = [];
var static_event2 = [];
var dynamic_event1 = [];
var dynamic_event2 = [];
var debug_search = [
	'{$var1}',
	'{$var2}'
];

function debugStatic(event, context, key) {
	if (event === true) {
		static_event1[key] = static_event1[key] === undefined ? 1 : static_event1[key] + 1;
		static_event2[key] = static_event2[key] === undefined ? 0 : static_event2[key];
	} else if (event === false) {
		static_event1[key] = static_event1[key] === undefined ? 0 : static_event1[key];
		static_event2[key] = static_event2[key] === undefined ? 1 : static_event2[key] + 1;
	}
	Fa(context).find('.status').html(Fa.replace(debug_search, [
		static_event1[key],
		static_event2[key]
	], debug_subject));
}

function debugDynamic(event, context, key) {
	if (event === true) {
		dynamic_event1[key] = dynamic_event1[key] === undefined ? 1 : dynamic_event1[key] + 1;
		dynamic_event2[key] = dynamic_event2[key] === undefined ? 0 : dynamic_event2[key];
	} else if (event === false) {
		dynamic_event1[key] = dynamic_event1[key] === undefined ? 0 : dynamic_event1[key];
		dynamic_event2[key] = dynamic_event2[key] === undefined ? 1 : dynamic_event2[key] + 1;
	}
	Fa(context).find('.status').html(Fa.replace(debug_search, [
		dynamic_event1[key],
		dynamic_event2[key]
	], debug_subject));
}
