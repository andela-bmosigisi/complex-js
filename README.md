# Complex-js
[Demo App](https://complexjs.firebaseapp.com/)

A javascript library for handling complex number calculations.

## Usage
- Clone the repository.
- Require Complex.js into your javascript application.
```javascript
  var Complex = require('./Complex.js');
```
- Create a new complex number with
```javascript
  var cmp = new Complex(3, 5); // 3 + 5i
  // or
  var cpm = Complex.fromExpression('3 + 5i');
```
- Among the complex number operations available:
  - Creation of Complex numbers from polar co-ordinates
  - Addition
  - Subtraction
  - Multiplication
  - Division
  - Magnitude
  - Raise to a power
  
## Testing
- Install jasmine-node
```npm install jasmine-node -g```
- Run the specs
```jasmine-node testsSpec.js```
