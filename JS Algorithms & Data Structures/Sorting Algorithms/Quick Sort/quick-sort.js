import { pivot } from './pivot-helper.js';

/**
 * Pseudocode - Quick Sort
 *
 * 1. Call the pivot helper on the array
 * 2. When the helper returns the updated pivot index, recursively call the pivot helper on the subarray to the left of that index, and the subarray to the right of that index
 * 3.
 */

/**
 * The `quickSort` function recursively sorts an array using the quicksort algorithm.
 * @param array - The array to be sorted using the quicksort algorithm.
 * @param [left=0] - The index of the leftmost element in the subarray being sorted. It is initially
 * set to 0, but will change as the function recursively calls itself on subarrays.
 * @param [right] - The index of the rightmost element in the subarray being sorted. It is initialized
 * to the last index of the input array in the initial call to `quickSort()`.
 * @returns The `quickSort` function returns the sorted `array`.
 */
const quickSort = (array, left = 0, right = array.length - 1) => {
  /* It checks if the left index is less than the
  right index, which means there are still elements to be sorted. Then it calls the `pivot` helper
  function to find the pivot index, which is used to divide the array into two subarrays. The
  function then recursively calls itself on the left subarray and the right subarray until all
  subarrays are sorted. */
  if (left < right) {
    let pivotIdx = pivot(array, left, right);
    // Left side
    quickSort(array, left, pivotIdx);
    // Right side
    quickSort(array, pivotIdx + 1, right);
  }

  return array;
};

console.log(quickSort([4, 6, 9, 1, 2, 5, 3]));
