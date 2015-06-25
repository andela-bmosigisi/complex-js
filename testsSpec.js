var Complex = require('./Complex');

describe("Complex Numbers Library toString", function(){
	it("should return an expression for a complex number", function(){
		var aComplex = new Complex(3, 4);
		expect(aComplex.toString()).toEqual("3 + 4i");
	});

	it("should be a magnitude", function(){
		var aComplex = new Complex(4, 5);
		expect(aComplex.magnitude()).toEqual(Math.sqrt(41));
	});

	it("should be added", function(){
		var aComplex = new Complex(4, 5);
		expect(aComplex.add({real : 4, imag : -1})).toEqual(new Complex(8, 4));
	});
});