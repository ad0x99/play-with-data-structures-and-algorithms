/**
 * Write a recursive function called someRecursive which accepts an array and a callback.
 * The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.
 * For examples:
 * const isOdd = val => val % 2 !== 0;
 * someRecursive([1,2,3,4], isOdd) // true
 * someRecursive([4,6,8,9], isOdd) // true
 * someRecursive([4,6,8], isOdd) // false
 * someRecursive([4,6,8], val => val > 10); // false
 */

/**
 * The `someRecursive` function recursively checks if any element in an array satisfies a given
 * condition specified by a callback function.
 * @param array - The array parameter is an array of elements that we want to check if any of them
 * satisfy a certain condition specified by the callback function.
 * @param callback - The `callback` parameter is a function that takes in an element of the `array` as
 * its argument and returns a boolean value. The purpose of this function is to specify a condition
 * that needs to be satisfied by at least one element of the `array`. The `someRecursive` function uses
 * this
 * @returns The `someRecursive` function is returning a boolean value. It returns `true` if at least
 * one element in the array satisfies the condition specified by the callback function, and `false`
 * otherwise.
 */
const someRecursive = (array, callback) => {
  if (!array.length) return false;
  if (callback(array[0])) return true;

  /* `someRecursive(array.slice(1), callback)` is calling the `someRecursive` function
  recursively with a new array that starts from the second element of the original array
  (`array.slice(1)`) and the same callback function. This is done to check if any of the
  remaining elements in the array satisfy the condition specified by the callback function. */
  return someRecursive(array.slice(1), callback);
};

const isOdd = (val) => val % 2 !== 0;
console.log(someRecursive([1, 2, 3, 4], isOdd));
console.log(someRecursive([4, 6, 8, 9], isOdd));
console.log(someRecursive([4, 6, 8], isOdd));
console.log(someRecursive([4, 6, 8], (val) => val > 10));
