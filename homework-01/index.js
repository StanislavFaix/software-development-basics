/**
 * Converts a number from a specified base to decimal.
 *
 * @param {string|number} input - the number to convert
 * @param {number} [base=16] - the base of the input number (default is hexadecimal)
 * @return {number} the decimal equivalent of the input number
 */
function toDecimal(input, base = 16) {
  input = input.toString();  // Ensure input is a string
  let number = 0;
  for (const element of input) {
    let value = parseInt(element, base);
    number = number * base + value;
  }
  return number;
}

/**
 * Converts a decimal number to a specified base.
 *
 * @param {number} number - the decimal number to convert
 * @param {number} base - the base to convert the number to (default is hexadecimal)
 * @return {string} the converted number in the specified base
 */
function fromDecimal(number, base = 16) {
  let output = '';
  while (number > 0) {
    let remainder = number % base;
    output = remainder.toString(base).toUpperCase() + output;
    number = Math.floor(number / base);
  }
  return output || '0';
}

/**
 * Converts a number from one base to another.
 *
 * @param {string|number} input - the number to convert
 * @param {number} originalBase - the original base of the input number
 * @param {number} targetBase - the target base to convert the number to
 * @return {string} the number converted to the target base
 */
function convertNumber(input, originalBase, targetBase) {
  return fromDecimal(toDecimal(input, originalBase), targetBase);
}

console.log(fromDecimal(215)); // converts decimal to hexadecimal
console.log(fromDecimal(215, 2)); // explicitly specify base of number to convert

console.log(convertNumber('A1F', 16, 8)); // converts hexadecimal to octal
console.log(convertNumber('11010111', 2, 16)); // converts binary to hexadecimal
console.log(convertNumber(11010111, 2, 16)); // converts binary (integer) to hexadecimal