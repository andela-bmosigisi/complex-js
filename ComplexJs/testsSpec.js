var Complex = require('./Complex').init();

describe("Complex Numbers Library toString", function(){
	it("should return an expression for a complex number", function(){
		var aComplex = new Complex(3, 4);
		expect(aComplex.toString()).toEqual("3 + 4i");
	});
});