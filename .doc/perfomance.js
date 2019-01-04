/*strict equal is the fastest
strict ternary is 33% slower
truthy falsy is 49% slower
ternary truthy falsy is 55% slower
if else and ternary are roughly the same.
normal equal and normal ternary slowest.*/
// strict equals:
var a = true, b;
if (a === true) {
	b = true;
} else {
	b = false
}
if (a === false) {
	b = true;
} else {
	b = false;
}
// ternary strict equals
var a = true, b;
b = (a === true) ? true : false;
b = (a === false) ? true : false;
// simple equality
var a = true, b;
if (a == true) {
	b = true;
} else {
	b = false;
}
if (a == false) {
	b = true;
} else {
	b = false;
}
// simple ternary equality
var a = true, b;
b = (a == true) ? true : false;
b = (a == false) ? true : false;
// truthy / falsy
var a = true, b;
if (a) {
	b = true;
} else {
	b = false;
}
if (!a) {
	b = true;
} else {
	b = false;
}
// ternary truthy / falsy
var a = true, b;
b = (a) ? true : false;
b = (!a) ? true : false;
