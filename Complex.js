/* Main Complex constructor for creating complex numbers */

var Complex = function(real, imaginary) {
	if(typeof real !== 'number' && typeof imaginary !== 'number') {
		return null;
	}
	imag = parseFloat(imaginary.toFixed(7));		
	real = parseFloat(real.toFixed(7));
		
	this.real = real;
	this.imag = imag;
};

//Create a complex number from an expression e.g. 3 + 4i
Complex.fromExpression = function(anExp) {
	if((typeof anExp !== 'string') || (anExp.indexOf('i') === -1)) {
		return false;
	}
	
	anExp = anExp.trim();
	if(anExp === 'i') return new Complex(0, 1);

	else if((anExp.indexOf('+') === -1) && (anExp.indexOf('-') === -1)) {
		var imag = anExp.substring(0,anExp.length-1);
		imag = parseFloat(imag);
		return new Complex(0, imag);
	}

	else{
		var realNegative = false;
		if(anExp[0] === '-') {
			anExp = anExp.substring(1);
			realNegative = true;
		}
		var signIndex = anExp.indexOf('+') > -1 ? anExp.indexOf('+') : anExp.indexOf('-');		
		var real = parseFloat(anExp.substring(0, signIndex));
		if(realNegative) real *= -1;		
		var imag = anExp.substring(signIndex+1, anExp.length);
		imag = imag.trim();
	
		if(imag === 'i') imag = '1i';
		imag = imag.substring(0, anExp.length-1);
		imag = parseFloat(imag);
	
		if(anExp.indexOf('-') > -1) {
			imag *= -1;
		}
		return new Complex(real, imag);
	}
}

//Create a complex number from polar co-ordinates.
Complex.fromPolar = function(r, theta) {
	var real = r * Math.cos(theta);
	var imag = r * Math.sin(theta);
	return new Complex(real, imag);
};

Complex.prototype = {

	// Add the number to another complex number
	add : function(arg) {
		var imag = this.imag + arg.imag;
		var real = this.real + arg.real;
		if(imag === 0) {
			return real;
		}
		return new Complex(real, imag);
	},

	// Subtract another complex number from our complex number.
	subtract: function(arg){
		var imag = this.imag - arg.imag;
		var real = this.real - arg.real;
		if(imag === 0) {
			return real;
		}
		return new Complex(real, imag);
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
		imag = parseFloat(imag.toFixed(7));		
		real = parseFloat(real.toFixed(7));
	
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
		imag = parseFloat(imag.toFixed(7));		
		real = parseFloat(real.toFixed(7));
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
			imag = parseFloat(imag.toFixed(7));		
			real = parseFloat(real.toFixed(7));
			if(imag === 0) {
				return real;
			}
			return new Complex(real ,imag);
		}
		else {
			var theta = Math.atan(this.imag/this.real);
			var r = Math.pow(this.magnitude(), arg);
			var real = r * Math.cos(arg * theta);
			var imag = r * Math.sin(arg * theta);
			imag = parseFloat(imag.toFixed(7));		
			real = parseFloat(real.toFixed(7));

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

var sqrt = Math.sqrt;
var pow = Math.pow;

Math.sqrt = function(aNumber) {
	if(aNumber === 0) return 0;
	else if(aNumber >= 0) return sqrt(aNumber);
	else {
		var abs = Math.abs(aNumber);
		return new Complex(0, sqrt(abs));
	}
};

//	Imaginary number constant

Math.I = new Complex(0, 1);

//Extend Math to handle raising e to complex numbers.

Math.pow = function(aNumber, power) {
	if(aNumber instanceof Complex && power) {		
		return aNumber.pow(power);
	}
	else if((aNumber === Math.E) && (power instanceof Complex)) {
		var temp = pow(Math.E, power.real) * Math.cos(power.imag);
		var temp1 = pow(Math.E, power.real) * Math.sin(power.imag);
		return new Complex(temp, temp1);
	}
	else if((typeof aNumber === 'number') && (power instanceof Complex)) {
		var ab = pow(aNumber, power.real);
		var temp = power.imag * Math.log(aNumber);
		return new Complex(ab * Math.cos(temp) , ab * Math.sin(temp));
	}
	return pow(aNumber, power);
};


if(typeof module === 'object') {
	module.exports = Complex;
}