/**
 * Write a recursive function called capitalizeWords. Given an array of words, return a new array containing each word capitalized.
 * For example:
 * capitalizedWords(['i', 'am', 'learning', 'recursion']); // ['I', 'AM', 'LEARNING', 'RECURSION']
 */

/**
 * The `capitalizeWords` function recursively capitalizes all words in an array and returns a new array
 * with the capitalized words.
 * @param array - an array of strings that we want to capitalize the first letter of each word.
 * @returns The `capitalizeWords` function is returning an array where each word in the input array is
 * capitalized. If the input array has only one element, that element is capitalized and returned as a
 * string. If the input array has more than one element, the function recursively calls itself on all
 * elements except the last one, capitalizes the last element, and pushes it onto the result array. The
 * final result is
 */
const capitalizeWords = (array) => {
  if (array.length === 1) {
    return [array[0].toUpperCase()];
  }

  /* `array.slice(0, -1)` is creating a new array that includes all
  elements of the original array except for the last one. The `slice()`
  method returns a shallow copy of a portion of an array into a new
  array object. In this case, it starts at index 0 and ends at the
  second-to-last index (-1). */
  let result = capitalizeWords(array.slice(0, -1));
  /* `array.slice(array.length - 1)` is creating a new array that contains only the last
  element of the original array. `[0]` is then used to access the first (and only)
  element of this new array. Finally, `toUpperCase()` is called on this element to
  capitalize it. This capitalized element is then pushed onto the `result` array. */
  result.push(array.slice(array.length - 1)[0].toUpperCase());
  return result;
};

console.log(capitalizeWords(['i', 'am', 'learning', 'recursion'])); // ['I', 'AM', 'LEARNING', 'RECURSION'])
