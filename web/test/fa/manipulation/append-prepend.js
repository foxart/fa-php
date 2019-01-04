var debug_subject = 'single-{$var1} / double-{$var2}';
Fa(function () {
	/*bind static event*/
	Fa('#append-prepend .append').on('click', function (key) {
		var a = $('document').siblings();
		console.log(a);
		var a = Fa('document').siblings();
		console.log(a);
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