/* Main Complex constructor for creating complex numbers */

var Complex = function(real, imaginary) {
	if(typeof real !== 'number' && typeof imaginary !== 'number') {
		return null;
	}
	imag = parseFloat(imaginary.toFixed(7));		
	real = parseFloat(real.toFixed(7));
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
	add : function(arg) {
		var imag = this.imag + arg.imag;
		var real = this.real + arg.real;
		if(imag === 0) {
			return real;
		}
		return new Complex(imag, real);
	},

	// Subtract another complex number from our complex number.
	subtract: function(arg){
		var imag = this.imag - arg.imag;
		var real = this.real - arg.real;
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
	multiply : function(arg) {
		if(typeof arg === 'number') {
			return new Complex(this.real * arg, this.imag * arg);
		}
		var real = (this.real * arg.real) - (this.imag * arg.imag);
		var imag = (this.real * arg.imag) + (arg.real * this.imag);
		if(imag === 0) {
			return real;
		}
		return new Complex(real, imag);
	},

	// Divide the complex number with the argument
	divide : function(arg) {
		if(typeof arg === 'number') {
			return new Complex(this.real / arg, this.imag / arg);
		}
		var denom = arg.imag * arg.imag + arg.real * arg.real;
		var real = (this.real * arg.real + this.imag * arg.imag) /
			denom;
		var imag = (arg.real * this.imag - this.real * arg.imag) /
			denom;
		if(imag === 0) {
			return real;
		}
		return new Complex(real, imag);
	},

	//raise the complex number to either a scalar or another complex number
	pow : function(arg) {
		if(arg instanceof Complex) {
			var mag = this.magnitude();
			var theta = Math.atan(this.imag/this.real);			
			var temp = Math.pow(mag, arg.real) * Math.pow(Math.E, (arg.imag * theta * -1));
			var temp1 = arg.real * theta + arg.imag * Math.log(mag);
			var real = temp * Math.cos(temp1);
			var imag = temp * Math.sin(temp1);
			return new Complex(real ,imag);
		}
		else {
			var theta = Math.atan(this.imag/this.real);
			var r = Math.pow(this.magnitude(), arg);
			var real = r * Math.cos(arg * theta);
			var imag = r * Math.sin(arg * theta);

			if(imag === 0) {
				return real;
			}
			return new Complex(real, imag);
		}
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
		if(theString ===  '- i') return '-i';
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

//Extend Math to handle raising e to complex numbers.

Math.power = function() {

}


module.exports = Complex;