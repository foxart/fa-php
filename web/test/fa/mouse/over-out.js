var debug_subject = 'over-{$var1} / out-{$var2}';
Fa(function () {
	/*bind static event*/
	Fa('#over-out .static').on('mouseover', function (key) {
		debugStatic(true, this, key);
		return false;
	}).on('mouseout', function (key) {
		debugStatic(false, this, key);
		return false;
	});
	/*bind dynamic event*/
	Fa('body').on('mouseover', '.dynamic', function (key) {
		debugDynamic(true, this, key);
		return false;
	});
	Fa('body').on('mouseout', '.dynamic', function (key) {
		debugDynamic(false, this, key);
		return false;
	});
	/*create dynamic elements*/
	setTimeout(function () {
		createDynamic('#over-out');
	}, 250);
});