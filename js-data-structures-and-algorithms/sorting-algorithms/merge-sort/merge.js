/**
 * Pseudocode - Merging Array
 *
 * 1. Create an empty array, take a look at the smallest values in each input array
 * 2. While there are still values we have not looked at
 * 2.1 If the value in the first array is smaller than the value in the second array, push the value in the first array into our results and move on to the next value in the first array
 * 2.2 If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next value in the second array
 * 2.3 Once we exhaust one array, push in all remaining values from the other array
 */

/**
 * The `merge` function takes in two arrays and merges them into a single sorted array in ascending
 * order.
 * @param firstArray - The first array to be merged with the second array in ascending order.
 * @param secondArray - The second array that will be merged with the first array in the `mergeSort`
 * function.
 * @returns The `mergeSort` function is returning a new array `results` that contains all the elements
 * from both `firstArray` and `secondArray`, sorted in ascending order.
 */
export const merge = (firstArray, secondArray) => {
  let results = [];
  let i = 0;
  let j = 0;

  /* The `while` loop is iterating through both `firstArray` and `secondArray` simultaneously,
  comparing their elements and pushing them into the `results` array in ascending order. The loop
  continues until either `firstArray` or `secondArray` has been fully iterated through. If the
  current element in `secondArray` is greater than the current element in `firstArray`, the current
  element in `firstArray` is pushed into `results` and `i` is incremented. Otherwise, the current
  element in `secondArray` is pushed into `results` and `j` is incremented. */
  while (i < firstArray.length && j < secondArray.length) {
    if (secondArray[j] > firstArray[i]) {
      results.push(firstArray[i]);
      i++;
    } else {
      results.push(secondArray[j]);
      j++;
    }
  }

  while (i < firstArray.length) {
    results.push(firstArray[i]);
    i++;
  }

  while (j < secondArray.length) {
    results.push(secondArray[j]);
    j++;
  }

  return results;
};

// console.log(merge([1, 10, 50], [2, 14, 99, 100]));
// console.log(merge([], [2, 14, 99, 100]));
// console.log(merge([1, 5, 89, 100], []));
