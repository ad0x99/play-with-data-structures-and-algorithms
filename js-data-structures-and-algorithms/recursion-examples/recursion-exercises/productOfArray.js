/**
 * Write a function called productOfArray which takes in an array of numbers and returns the product of them all.
 * For example:
 * productOfArray([1,2,3]) // 6
 * productOfArray([1,2,3,10]) // 60
 */

/**
 * The function recursively calculates the product of all elements in an array.
 * @param array - The parameter `array` is an array of numbers for which we want to find the product of
 * all the elements.
 * @returns The function `productOfArray` is recursively calculating the product of all the elements in
 * the input `array`. If the input `array` is empty, the function returns 1. Otherwise, it multiplies
 * the first element of the `array` with the result of calling `productOfArray` on the rest of the
 * `array` (excluding the first element) using the `slice` method
 */
const productOfArray = (array) => {
  if (!array.length) return 1;
  /* `array[0] * productOfArray(array.slice(1));` is multiplying the first element of the input
  `array` with the result of calling `productOfArray` on the rest of the `array` (excluding the
  first element) using the `slice` method. This is a recursive call to the `productOfArray`
  function, which will continue to multiply the first element of the remaining array until there are
  no more elements left. */
  return array[0] * productOfArray(array.slice(1));
};

console.log(productOfArray([1, 2, 3]));
console.log(productOfArray([1, 2, 3, 10]));
