// 1. Optimize performance of complex selectors
// Query a subset of the DOM when using complex selectors drastically improves performance:
var subset = $("");
$("input[value^='']", subset);
// 2. Set Context and improve the performance
// On the core jQuery function, specify the context parameter when. Specifying the context parameter allows jQuery to start from a deeper branch in the DOM, rather than from the DOM root. Given a large enough DOM, specifying the context parameter should translate to performance gains.
$("input:radio", document.forms[0]);
// 3. Live Event Handlers
// Set an event handler for any element that matches a selector, even if it gets added to the DOM after the initial page load:
$('button.someClass').live('click', someFunction);
// This allows you to load content via ajax, or add them via javascript and have the event handlers get set up properly for those elements automatically.
// Likewise, to stop the live event handling:
$('button.someClass').die('click', someFunction);
// These live event handlers have a few limitations compared to regular events, but they work great for the majority of cases. Live event will work starting from jQuery 1.3
// 4. Checking the Index
// jQuery has .index but it is a pain to use as you need the list of elements and pass in the element you want the index of
var index = $('#ul>li').index(liDomObject);
// The following is easier:
// if you want to know the index of an element within a set, e.g. list items within a unordered list:
$("ul > li").click(function () {
	var index = $(this).prevAll().length;
});
// 5. Use jQuery data method
// jQuery’s data() method is useful and not well known. It allows you to bind data to DOM elements without modifying the DOM.
// 6. Fadeout Slideup effect to remove an element
// Combine more than one effects in jQuery to animate and remove an element from DOM.
$("#myButton").click(function () {
	$("#myDiv").fadeTo("slow", 0.01, function () { //fade
		$(this).slideUp("slow", function () { //slide up
			$(this).remove(); //then remove from the DOM
		});
	});
});
// 7. Checking if an element exists
// Use following snippet to check whether an element exists or not.
if ($("#someDiv").length) {
	//hooray!!! it exists...
}
// 8. Add dynamically created elements into the DOM
// Use following code snippet to create a DIV dynamically and add it into the DOM.
// Further Reading: Dynamically Add/Remove rows in HTML table using JavaScript
var newDiv = $('<div></div>');
newDiv.attr("id", "myNewDiv").appendTo("body");
// 9. Line breaks and chainability
// Instead of doing:
$("a").hide().addClass().fadeIn().hide();
// You can increase readability like so:
$("a")
	.hide()
	.addClass()
	.fadeIn()
	.hide();
// 10. Creating custom selectors
$.extend($.expr[':'], {
	over100pixels: function (a) {
		return $(a).height() > 100;
	}
});
$('.box:over100pixels').click(function () {
	alert('The element you clicked is over 100 pixels high');
});
// 11. Cloning an object in jQuery
// Use .clone() method of jQuery to clone any DOM object in JavaScript.
// Clone the DIV
var cloned = $('#somediv').clone();
// jQuery’s clone() method does not clone a JavaScript object. To clone JavaScript object, use following code.
// Shallow copy
var newObject = jQuery.extend({}, oldObject);
// Deep copy
var newObject = jQuery.extend(true, {}, oldObject);
// 12. Test if something is hidden using jQuery
// We use .hide(), .show() methods in jquery to change the visibility of an element. Use following code to check the whether an element is visible or not.
if ($(element).is(":visible") == "true") {
	//The element is Visible
}
// 13. Alternate way of Document Ready
//Instead of
$(document).ready(function () {
	//document ready
});
//Use
$(function () {
	//document ready
});
// 14. Selecting an element with . (period) in its ID
// Use backslash in the selector to select the element having period in its ID.
$("#Address\\.Street").text("Enter this field");
// 15. Counting immediate child elements
// If you want to count all the DIVs present in the element #foo
// <div id="foo">
//   <div id="bar"></div>
//   <div id="baz">
//     <div id="biz">
//   </div>
//   <span><span>
// </div>
//jQuery code to count child elements
$("#foo > div").size();
// 16. Make an element to “FLASH”
jQuery.fn.flash = function (color, duration) {
	var current = this.css('color');
	this.animate({color: 'rgb(' + color + ')'}, duration / 2);
	this.animate({color: current}, duration / 2);
};
//Then use the above function as:
$('#importantElement').flash('255,0,0', 1000);
// 17. Center an element on the Screen
jQuery.fn.center = function () {
	this.css("position", "absolute");
	this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
	this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
	return this;
};
//Use the above function as:
$(element).center();
// 18. Getting Parent DIV using closest
// If you want to find the wrapping DIV element (regardless of the ID on that DIV) then you’ll want this jQuery selector:
$("#searchBox").closest("div");
// 19. Disable right-click contextual menu
// There’s many Javascript snippets available to disable right-click contextual menu, but JQuery makes things a lot easier:
$(document).ready(function () {
	$(document).bind("contextmenu", function (e) {
		return false;
	});
});
// 20. Get mouse cursor x and y axis
// This script will display the x and y value – the coordinate of the mouse pointer.
$().mousemove(function (e) {
	//display the x and y axis values inside the P element
	$('p').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);
});
// <p></p>