var debug_search = [
	'{$pageX}',
	'{$pageY}',
	'{$clientX}',
	'{$clientY}'
];
var debug_subject = '<div class="fl-l col-6">Page<hr/>X:{$pageX}<br/>Y:{$pageY}</div><div class="fl-r col-6">Client<hr/>X:{$clientX}<br/>Y:{$clientY}</div>';
Fa(function () {
	/*bind static event*/
	Fa('#move .static .block-outer').on('mousemove', function (key, event) {
		// debugStatic(true, this, key);
		Fa(this).previous('.status').html(Fa.replace(debug_search, [
			event.pageX,
			event.pageY,
			event.clientX,
			event.clientY
		], debug_subject));
		return false;
	});
	/*bind dynamic event*/
	Fa('#move').on('mousemove', '.dynamic .block-outer', function (key) {
		// debugDynamic(true, this, key);
		Fa(this).previous('.status').html(Fa.replace(debug_search, [
			event.pageX,
			event.pageY,
			event.clientX,
			event.clientY
		], debug_subject));
		return false;
	});
	/*create dynamic elements*/
	setTimeout(function () {
		createDynamic('#move');
		Fa('.status').html(Fa.replace(debug_search, [0, 0, 0, 0], debug_subject));
	}, 250);
});