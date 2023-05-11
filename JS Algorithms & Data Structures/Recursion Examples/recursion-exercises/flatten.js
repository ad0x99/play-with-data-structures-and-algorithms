/**
 * Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.
 * For example:
 * flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
 * flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
 * flatten([[1],[2],[3]]) // [1,2,3]
 * flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]
 */

/**
 * The `flatten` function recursively flattens a nested array into a single-dimensional array.
 * @param array - The input array that needs to be flattened.
 * @returns The `flatten` function is returning a new array that contains all the elements of the input
 * `array` flattened into a single level.
 */
const flatten = (array) => {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      /* `newArr.concat(flatten(array[i]))` is concatenating the flattened array `flatten(array[i])` to
      the `newArr` array. This is done to ensure that all the values in the nested arrays are added
      to the final flattened array. The `concat()` method returns a new array that contains the
      elements of the original array followed by the elements of the argument(s) passed to it. */
      newArr = newArr.concat(flatten(array[i]));
    } else {
      /* `newArr.push(array[i]);` is adding the current element `array[i]` to the end of the `newArr`
      array. This is done when the current element is not an array, i.e., it is a single value that
      needs to be added to the final flattened array. */
      newArr.push(array[i]);
    }
  }

  return newArr;
};

console.log(flatten([1, 2, 3, [4, 5]]));
console.log(flatten([1, [2, [3, 4], [[5]]]]));
console.log(flatten([[1], [2], [3]]));
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]));
