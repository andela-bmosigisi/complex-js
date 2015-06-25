/* Main Complex constructor for creating complex numbers */

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
	fromPolar : function(r, theta) {
		var real = r * Math.cos(theta);
		var imag = r * Math.sin(theta);
		return new Complex(real, imag);
	},

	// Add the number to another complex number
	add : function(complexNum) {
		var imag = this.imag + complexNum.imag;
		var real = this.real + complexNum.real;
		if(imag === 0) {
			return real;
		}
		return new Complex(imag, real);
	},

	// Subtract another complex number from our complex number.
	subtract: function(complexNum){
		var imag = this.imag - complexNum.imag;
		var real = this.real - complexNum.real;
		if(imag === 0) {
			return real;
		}
		return new Complex(imag, real);
	},

	//get the magnitude/modulus of an imaginary number
	magnitude : function() {
		return Math.sqrt(this.real * this.real + this.imag * this.imag);
	},

	// Multiply the complex number with another one
	multiply : function(complexNum) {
		var real = (this.real * complexNum.real) - (this.imag * complexNum.imag);
		var imag = (this.real * complexNum.imag) + (complexNum.real * this.imag);

		if(imag === 0) {
			return real;
		}
		return new Complex(real, imag);
	},

	divide : function(complexNum) {

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
	}
};


/* Define a square root function on Math that handles square roots of negative
	numbers. */

Math.srt = function(aNumber) {
	if(aNumber === 0) return 0;
	else if(aNumber >= 0) return Math.sqrt(aNumber);
	else {
		var abs = Math.abs(aNumber);
		return new Complex(0,Math.sqrt(abs));
	}
};

//	Imaginary number constant

Math.I = new Complex(0, 1);


module.exports = Complex;