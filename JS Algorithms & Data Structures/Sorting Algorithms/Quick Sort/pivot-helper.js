import { swap } from '../common/swap.js';

/**
 * Given an array, this help function should designate an element as the pivot
 * It should then rearrange elements in the array so that all values less than the pivot are moved to the left of the pivot, and all values greater than the pivot are moved to the right of the pivot
 * The order of elements on either side of the pivot does not matter
 * The helper should do this in place without creating a new array
 * When complete, the helper should return the index of the pivot
 *
 * The runtime of quick sort depends in part on how one selects the pivot
 * Ideally, the pivot should be chosen so that it's roughly the median value in the data set you're sorting
 */

/**
 * Pseudocode - Pivot Helper
 *
 * 1. Grab the pivot from the start of the array
 * 2. Store the current pivot index in a variable (this will keep track of where the pivot should end up)
 * 3. Loop through the array from the start until the end
 * 3.1 If the pivot is greater than the current element, increment the pivot index variable and then swap the current element with the element at the pivot index
 * 4. Swap the starting element with the pivot index
 * 5. Return the pivot index
 */

/**
 * The function takes an array and returns the index of the pivot element after rearranging the array
 * such that all elements smaller than the pivot are to its left and all elements greater than the
 * pivot are to its right.
 * @param array - The array parameter is the array that needs to be sorted using the pivot function.
 * @param [start=0] - The starting index of the subarray to be sorted. By default, it is set to 0,
 * which means the entire array will be sorted.
 * @param [end] - The `end` parameter is the index of the last element in the subarray that we want to
 * consider for the pivot operation. By default, it is set to the length of the entire array.
 * @returns The `pivot` function is returning the index of the pivot element after partitioning the
 * input array.
 */
export const pivot = (array, start = 0, end = array.length) => {
  // Assume the pivot is always the first element
  let pivot = array[start];
  let swapIdx = start;

  for (let i = start + 1; i < array.length; i++) {
    if (pivot > array[i]) {
      swapIdx++;
      swap(array, swapIdx, i);
    }
  }

  swap(array, start, swapIdx);
  return swapIdx;
};

console.log(pivot([4, 8, 2, 1, 5, 7, 6, 3]));
