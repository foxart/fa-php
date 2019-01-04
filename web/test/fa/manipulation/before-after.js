var debug_subject = 'single-{$var1} / double-{$var2}';
Fa(function () {
	/*bind static event*/
	Fa('#click .static').remove('click', function (key) {
		debugStatic(true, this, key);
		// var context = this;
		// static_timer = setTimeout(function () {
		// 	if (!static_prevent) {
		// 		debugStatic(true, context, key);
		// 	}
		// 	static_prevent = false;
		// }, delay);
	}).on('dblclick', function (key) {
		debugStatic(false, this, key);
		// clearTimeout(static_timer);
		// static_prevent = true;
		// debugStatic(false, this, key);
	});
	/*bind dynamic event*/
	Fa('#click').on('click', '.dynamic', function (key) {
		debugDynamic(true, this, key);
		// var context = this;
		// dynamic_timer = setTimeout(function () {
		// 	if (!dynamic_prevent) {
		// 		debugDynamic(true, context, key);
		// 	}
		// 	dynamic_prevent = false;
		// }, delay);
	});
	Fa('#click').on('dblclick', '.dynamic', function (key) {
		debugDynamic(false, this, key);
		// clearTimeout(dynamic_timer);
		// dynamic_prevent = true;
		// debugDynamic(false, this, key);
		// return false;
	});
		/*create dynamic elements*/
	setTimeout(function () {
		createDynamic('#add-remove');
	}, 250);
});