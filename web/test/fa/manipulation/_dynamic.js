function createDynamic(id) {

	// console.log(Fa(id + ' .static'));
	Fa(id + ' .static').after(
		Fa('<div>').addClass('dynamic').append(function (i) {
			i++;
			return '[dynamic ' + i + ']';
		}).append(Fa('<div>').addClass('status').text(function (i) {
			i++;
			return '[status ' + i + ']';
		})).append(Fa('<div>').addClass('block-outer').append(
			Fa('<div>').addClass('block-inner')
		))
	)
}