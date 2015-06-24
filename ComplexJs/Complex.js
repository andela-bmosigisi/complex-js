/* The main constructor for making complex functions. Takes two arguments, a real
	part and an imaginary part */

var Complex = function(real, imaginary) {
	if(typeof real !== 'number' && typeof imaginary !== 'number') {
		return null;
	}
	this.real = real;
	this.imag = imaginary;
};

Complex.prototype = {

	//Create a complex number from an expression e.g. 3 + 4i
	fromExpression : function(anExp) {

	},

	//Create a complex number from polar co-ordinates.
	fromPolar : function() {

	},

	magnitude : function() {
		return Math.sqrt(this.real * this.real + this.imag * this.imag);
	},

	// Multiply the complex number with another one
	multiply : function() {

	},

	//Get a string representation of the complex number
	toString: function(){
		var theString = "";
		if (this.real) {
			theString += this.real;
		} 
		if (this.real && this.imag || this.imag < 0) {
			theString += this.imag < 0 ? " - " : " + "; 
		}
		if (this.imag){
			var im = Math.abs(this.imag);
			if (im != 1) theString += im;
			theString += 'i';
		}
		return theString;
	},


};

module.exports = { 
	init : function() {
			return Complex;
		}
};