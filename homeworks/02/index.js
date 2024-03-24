const NumberSystem = Object.freeze({
  BINARY: {
    base: 2,
    name: 'binary',
    validCharacters: ['0', '1'],
    fromDecimal: function (number) {
      return this.validCharacters[number];
    },
    validateNumber: function (number) {
      if (/^[0-1]+$/.test(number) === false) {
        throw new Error(`Invalid characters found for ${this.name} number system on input: ${number}.`);
      }
    }
  },
  OCTAL: {
    base: 8,
    name: 'octal',
    validCharacters: ['0', '1', '2', '3', '4', '5', '6', '7'],
    fromDecimal: function (number) {
      return this.validCharacters[number];
    },
    validateNumber: function (number) {
      if (/^[0-7]+$/.test(number) === false) {
        throw new Error(`Invalid characters found for ${this.name} number system on input: ${number}.`);
      }
    }
  },
  DECIMAL: {
    base: 10,
    name: 'decimal',
    validCharacters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    fromDecimal: function (number) {
      return this.validCharacters[number];
    },
    validateNumber: function (number) {
      if (/^\d+$/.test(number) === false) {
        throw new Error(`Invalid characters found for ${this.name} number system on input: ${number}.`);
      }
    }
  },
  HEXADECIMAL: {
    base: 16,
    name: 'hexadecimal',
    validCharacters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    fromDecimal: function (number) {
      return this.validCharacters[number];
    },
    validateNumber: function (number) {
      if (/^[0-9A-Fa-f]+$/.test(number) === false) {
        throw new Error(`Invalid characters found for ${this.name} number system on input: ${number}.`);
      }
    }
  }
});

/**
 * Converts a number from a specified number system to decimal.
 *
 * @param {string|number} number - the number to convert
 * @param {object} originalNumberSystem - the number system of the input number (default is hexadecimal)
 * @return {number} the decimal equivalent of the input number
 */
function toDecimal(number, originalNumberSystem = NumberSystem.HEXADECIMAL) {
  originalNumberSystem.validateNumber(number);  // Ensure input is a valid number
  number = number.toString();  // Ensure input is a string
  let decimalNumber = 0;
  for (const element of number) {
    const value = originalNumberSystem.validCharacters.indexOf(element.toUpperCase());
    decimalNumber = decimalNumber * originalNumberSystem.base + value;
  }
  return decimalNumber;
}

/**
 * Converts a decimal number to a specified number system.
 *
 * @param {number} number - the decimal number to convert
 * @param {object} targetNumberSystem - the number system to convert the number to (default is hexadecimal)
 * @return {string} the converted number in the specified number system
 */
function fromDecimal(number, targetNumberSystem = NumberSystem.HEXADECIMAL) {
  NumberSystem.DECIMAL.validateNumber(number);  // Ensure input is a valid number
  let output = '';
  while (number > 0) {
    let remainder = number % targetNumberSystem.base;
    output = targetNumberSystem.fromDecimal(remainder) + output;
    number = Math.floor(number / targetNumberSystem.base);
  }
  return output || '0';
}

/**
 * Converts a number from one base to another.
 *
 * @param {string|number} input - the number to convert
 * @param originalNumberSystem - the original base of the input number
 * @param targetNumberSystem - the target base to convert the number to
 * @return {string} the number converted to the target base
 */
function convertNumber(input, originalNumberSystem, targetNumberSystem) {
  return fromDecimal(toDecimal(input, originalNumberSystem), targetNumberSystem);
}

// Simple test cases to convert decimal to hexadecimal and back
console.log(fromDecimal(215)); // converts decimal to hexadecimal
console.log(toDecimal('D7')); // converts hexadecimal to decimal

// Test cases, when target number system is explicitly specified
console.log(fromDecimal(215, NumberSystem.BINARY)); // converts decimal to binary

// Test cases, when source number system and target number system are explicitly specified
console.log(convertNumber('A1F', NumberSystem.HEXADECIMAL, NumberSystem.OCTAL)); // converts hexadecimal to octal
console.log(convertNumber('11010111', NumberSystem.BINARY, NumberSystem.HEXADECIMAL)); // converts binary to hexadecimal
console.log(convertNumber(11010111, NumberSystem.BINARY, NumberSystem.HEXADECIMAL)); // converts binary (integer) to hexadecimal

// Test cases, when inputs are invalid
try {
  convertNumber(12, NumberSystem.BINARY, NumberSystem.HEXADECIMAL); // invalid binary value throws error
} catch (error) {
  console.error(error.stack);
}
try {
  convertNumber(19, NumberSystem.OCTAL, NumberSystem.HEXADECIMAL); // invalid octal value throws error
} catch (error) {
  console.error(error.stack);
}
try {
  convertNumber('1A', NumberSystem.DECIMAL, NumberSystem.HEXADECIMAL); // invalid decimal value throws error
} catch (error) {
  console.error(error.stack);
}
try {
  convertNumber('1G', NumberSystem.HEXADECIMAL, NumberSystem.BINARY); // invalid hexadecimal value throws error
} catch (error) {
  console.error(error.stack);
}