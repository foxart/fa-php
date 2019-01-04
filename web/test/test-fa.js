document.addEventListener("DOMContentLoaded", function (event) {
	console.warn("Dom loaded");
});
window.addEventListener("load", function (event) {
	console.warn("Resources loaded");
});
/**
 *
 */
Fa(function () {
	var array_manipulations = [
		Fa('.single'),
		Fa('.multiple'),
		'Lorem ipsum dolor sit amet',
		[
			Fa('<div>').text('TEXT'),
			Fa('<div>').append(Fa('<a>').setAttribute('href', '/').text('link')).addClass('link'),
			// document.getElementsByClassName('dom'),
			document.getElementById('dom')
		]
	];
	var array_types = [
		undefined,
		true,
		null,
		1,
		5.5,
		'text',
		{
			a: 1
		},
		document.getElementById('dom'),
		document.getElementsByClassName('dom')
	];
	/** node manipulations */
	// test_prepend('.test', array_manipulations);
	// test_append('.test', array_manipulations);
	// test_before('.test', array_manipulations);
	// test_after('.test', array_manipulations);
	/** node manipulations array */
	// test_prepend_array('.test', array_manipulations);
	// test_append_array('.test', array_manipulations);
	// test_before_array('.test', array_manipulations);
	// test_after_array('.test', array_manipulations);
	/** remove */
	// test_remove('.test');
	/** clean */
	// test_clean('.test');
	/** clone */
	// test_clone('.test');
	/** typeof */
	// test_typeof(array_types);
	/** class manipulations */
	// Fa('.single').addClass('bs-s');
	// Fa('.multiple').addClass(['bs-s', 'bg-cl-blue-3']);
	// Fa('.single').removeClass('bg-cl-blue-3');
	// Fa('.multiple').removeClass(['bg-cl-red-3', 'bg-cl-red-4']);
	// console.log(Fa('.single').hasClass(['bs-s', 'test']));
	// console.log(Fa('.multiple').hasClass('bg-cl-blue-3'));
	/** html */
	// console.log(Fa('.single').html());
	// console.log(Fa('.multiple').html());
	// Fa('.single').html('<a href="#">single</a>');
	// Fa('.multiple').html(function (key, value) {
	// 	return '<a href="#">' + value + '</a>';
	// });
	/** text */
	// console.log(Fa('.single').text());
	// console.log(Fa('.multiple').text());
	// Fa('.single').text('<a href="#">single</a>');
	// Fa('.multiple').text(function (key, value) {
	// return '<a href="#">' + value + '</a>';
	// });
	/** value */
	// console.log(Fa('input[name=single]').value());
	// console.log(Fa('input[name=multiple]').value());
	// Fa('input[name=single]').value('[single]');
	// Fa('input[name=multiple]').value(function (key, value) {
	// 	return '[' + value + ']';
	// });
	/** attributes */
	// Fa('.multiple').setAttribute('data-0', 'value0');
	// Fa('.multiple').setAttribute('class', function (key, value) {
	// 	return value + ' cl-white'
	// });
	// Fa('.multiple').setAttribute({'data-1': 'value1', 'data-2': 'value2'});
	// Fa('.multiple').each(function (key, value) {
	// 	console.log(Fa(this).getAttribute('class'), key, value);
	// });
	// console.log(Fa('.multiple').getCss('data-0'));
	// console.log(Fa('.multiple').getAttribute(['data-1', 'data-2']));
	// console.log(Fa('.multiple').getAttribute());
	/** css */
	// Fa('.single').setCss('border', 'solid 3px red');
	// Fa('.multiple').setCss('border', 'solid 3px blue');
	// Fa('.multiple').setCss('border', function () {
	// 	return 'none';
	// });
	// Fa('.multiple').setCss({'font-weight': 'bold', 'text-align': 'right'});
	// Fa('.multiple').each(function () {
	// 	console.log(Fa(this).getCss('background-color'));
	// });
	// console.log(Fa('.multiple').getCss('background-color'));
	// console.log(Fa('.multiple').getCss([ 'background-color','font-size']));
	// console.log(Fa('.multiple').getCss());
	/** on event */
	test_on('mouseover');
});

function test_typeof(array) {
	array.forEach(function (value) {
		console.log(value, Fa.typeOf(value));
	})
}

function test_clone(selector) {
	Fa(selector).each(function () {
		var clone = Fa(this).clone();
		Fa(this).before(clone);
		Fa(this).after(clone);
		Fa(this).prepend(clone);
		Fa(this).append(clone);
	})
}

/*
append
 */
function test_append(selector, array) {
	for (var i = 0; i < array.length; i++) {
		Fa(selector).append(array[i]);
	}
}

function test_append_array(selector, array) {
	Fa(selector).append(array);
}

/*
after
 */
function test_after(selector, array) {
	for (var i = 0; i < array.length; i++) {
		Fa(selector).after(array[i]);
	}
}

function test_after_array(selector, array) {
	Fa(selector).after(array);
}

/*
prepend
 */
function test_prepend(selector, array) {
	for (var i = 0; i < array.length; i++) {
		Fa(selector).prepend(array[i]);
	}
}

function test_prepend_array(selector, array) {
	Fa(selector).prepend(array);
}

/*
before
 */
function test_before(selector, array) {
	for (var i = 0; i < array.length; i++) {
		Fa(selector).before(array[i]);
	}
}

function test_before_array(selector, array) {
	Fa(selector).before(array);
}

/*
remove
 */
function test_remove(selector) {
	Fa(selector).remove();
}

/*
clean
 */
function test_clean(selector) {
	Fa(selector).clean();
}

/**
 * on event
 */
function test_on(event_type) {
	/*create static elements*/
	Fa('.single').clone().forEach(function () {
		Fa('.test').append(Fa('<div>').addClass('mouse-static')
			.append(Fa('<div>').addClass('mouse'))
		);
	});
	/*bind static event*/
	var static_over = 0;
	var static_out = 0;
	Fa('.mouse-static').on('mouseover', function () {
		static_over++;
		Fa(this).find('.mouse').html('static' + '<br/>' + 'mouseover' + ' x ' + static_over + '<br/>' + 'mouseout' + ' x ' +
			static_out + '<br/>');
	}).on('mouseout', function () {
		static_out++;
		Fa(this).find('.mouse').html('static' + '<br/>' + 'mouseover' + ' x ' + static_over + '<br/>' + 'mouseout' + ' x ' +
			static_out + '<br/>');
	});
	/*bind dynamic event*/
	var dynamic_over = 0;
	var dynamic_out = 0;
	Fa('body').on('mouseover', '.mouse-dynamic', function () {
		dynamic_over++;
		Fa(this).find('.mouse').html('dynamic' + '<br/>' + 'mouseover' + ' x ' + dynamic_over + '<br/>' + 'mouseout' + ' x ' + dynamic_out + '<br/>');
	});
	Fa('body').on('mouseout', '.mouse-dynamic', function () {
		dynamic_out++;
		Fa(this).find('.mouse').html('dynamic' + '<br/>' + 'mouseover' + ' x ' + dynamic_over + '<br/>' + 'mouseout' + ' x ' + dynamic_out + '<br/>');
	});
	/*JQuery*/
	// $('.test').on(event_type, '.dynamic .multiple', function (event) {
	// 	$(this).after($('<div>').html('$'));
	// 	return false;
	// });
	// $('.test').on(event_type, '.dynamic .multiple span', function (event) {
	// 	event.stopPropagation();
	// 	return false;
	// });
	/*create dynamic elements*/
	setTimeout(function () {
		// Fa('.multiple').clone().forEach(function (value) {
		// 	Fa('.test').append(Fa('<div>').addClass('dynamic').append(Fa(value).html(function (key, value) {
		// 		return value + '[dynamic]';
		// 	})));
		// });
		Fa('.multiple').clone().forEach(function () {
			Fa('.test').append(Fa('<div>').addClass('mouse-dynamic')
				.append(Fa('<div>').addClass('mouse'))
			);
		});
	}, 300);
}