var debug_subject = 'enter-{$var1} / leave-{$var2}';
Fa(function () {
	/*bind static event*/
	Fa('#enter-leave .static').on('mouseenter', function (key) {
		debugStatic(true, this, key);
		return false;
	}).on('mouseleave', function (key) {
		debugStatic(false, this, key);
		return false;
	});
	/*bind dynamic event*/
	Fa('#enter-leave').on('mouseenter', '.dynamic', function (key) {
		debugDynamic(true, this, key);
		return false;
	});
	Fa('#enter-leave').on('mouseleave', '.dynamic', function (key) {
		debugDynamic(false, this, key);
		return false;
	});
	/*create dynamic elements*/
	setTimeout(function () {
		createDynamic('#enter-leave');
	}, 250);
});