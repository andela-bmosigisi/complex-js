var Complex = require('./Complex');

describe("Complex Numbers Library", function(){
	it("should return an expression", function(){
		var aComplex = new Complex(3, 4);
		expect(aComplex.toString()).toEqual("3 + 4i");
	});

	it("should find the modulus", function(){
		var aComplex = new Complex(4, 5);
		expect(aComplex.magnitude()).toEqual(Math.sqrt(41));
		expect(new Complex(2,4).magnitude()).toEqual(Math.sqrt(20));
	});

	it("should add complex numbers", function(){
		var aComplex = new Complex(4, 5);
		expect(aComplex.add({real : 4, imag : -1})).toEqual(new Complex(8, 4));
		expect(aComplex.add(new Complex(-4,-5))).toEqual(0);
		expect(aComplex.add(Complex.fromExpression('3 + 4i'))).toEqual(new Complex(7,9));
	});

	it("should subtract complex numbers", function(){
		var complexa = new Complex(9,0);
		var complexb = new Complex(4,7);
		expect(complexa.subtract(complexb)).toEqual(new Complex(5,-7));
		expect(complexb.subtract(new Complex(3,4))).toEqual(new Complex(1,3));
	});

	it("should create complex numbers from polar coordinates", function(){
		var complexa = new Complex(5, 1);
		expect(Complex.fromPolar(Math.sqrt(26), Math.atan(1/5))).toEqual(complexa);
		expect(Complex.fromPolar(Math.sqrt(29), Math.atan(2/5))).toEqual(new Complex(5 ,2));
		expect(Complex.fromPolar(3, 0)).toEqual(new Complex(3, 0));
	});

	it("should create complex numbers from expressions", function(){
		expect(Complex.fromExpression('40i')).toEqual(new Complex(0, 40))
		expect(Complex.fromExpression(' -5 +  7i')).toEqual(new Complex(-5, 7));
		expect(Complex.fromExpression('4 + 5i')).toEqual(new Complex(4, 5));
		expect(Complex.fromExpression('30')).toBe(false);
		expect(Complex.fromExpression('  -30.12332434   + 23432234.5345i')).toEqual(
			new Complex(-30.12332434, 23432234.5345));
	});

	it("should multiply complex numbers", function(){
		var complexa = new Complex(9,3);
		var complexb = new Complex(4,7);
		var complexc = new Complex(-1904, 224);
		expect(complexa.multiply(complexb)).toEqual(new Complex(15,75));
		expect(complexb.multiply(complexc)).toEqual(new Complex(-9184,-12432));
		expect(new Complex(0, 56).multiply(Complex.fromExpression('4 + 34i'))).toEqual(
			complexc);
		expect(complexb.multiply(3)).toEqual(new Complex(12, 21));
		expect(new Complex(3, 4).multiply(5)).toEqual(new Complex(15, 20));
		expect(new Complex(4, 1).multiply(new Complex(4, -7))).toEqual(new Complex(23, -24));
	});

	it("should divide complex numbers", function(){
		var complexa = new Complex(9,3);
		var complexb = new Complex(4,7);
		var complexc = new Complex(-1904, 224);
		expect(complexa.divide(complexb)).toEqual(new Complex(0.8769231, -0.7846154));
		expect(complexc.divide(complexb)).toEqual(new Complex(-93.0461538,218.8307692));
		expect(new Complex(0, 56).divide(Complex.fromExpression('4 + 34i'))).toEqual(
			new Complex(1.6245734, 0.1911263));
	});

	it("should raise numbers to powers properly", function(){
		var complexa = new Complex(9,3);
		expect(Math.pow(3,2)).toEqual(9);
		expect(Math.pow(complexa, complexa)).toEqual(new Complex(-231326153.1830794, -51897015.9326133));
		expect(Math.pow(Math.I, 2)).toEqual(-1);
	});

	it("should detect valid complex numbers", function(){
		expect(Complex.isComplex(new Complex(3, 4))).toBe(true);
		expect(Complex.isComplex(Complex.fromExpression('4 + 3i'))).toBe(true);
		expect(Complex.isComplex('4 + 3ii')).toBe(false);				
		expect(Complex.isComplex('4 + 3i')).toBe(true);
	});
});