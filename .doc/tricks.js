for (var property in this) {
	if (this.hasOwnProperty(property)) {
		console.log(this[property])
	}
}
for (var property in this) {
	if (Object.prototype.hasOwnProperty.call(this, property)) {
		console.log(this[property])
	}
}
