var debug_subject = 'down-{$var1} / up-{$var2}';
Fa(function () {
	/*bind static event*/
	Fa('#down-up .static').on('mousedown', function (key) {
		debugStatic(true, this, key);
		return false;
	}).on('mouseup', function (key) {
		debugStatic(false, this, key);
		return false;
	});
	/*bind dynamic event*/
	Fa('#down-up').on('mousedown', '.dynamic', function (key) {
		debugDynamic(true, this, key);
		return false;
	});
	Fa('#down-up').on('mouseup', '.dynamic', function (key) {
		debugDynamic(false, this, key);
		return false;
	});
	setTimeout(function () {
		/*create dynamic elements*/
		createDynamic('#down-up');
	}, 250);
});