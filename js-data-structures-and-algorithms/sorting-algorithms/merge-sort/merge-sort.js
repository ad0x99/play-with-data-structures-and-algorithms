import { merge } from './merge.js';

/**
 * In order to implement merge sort, it's useful to first implement a function responsible for merging 2 sorted arrays
 * Given 2 arrays which are sorted, this helper function should create a new array which is also sorted, and consists of all of the elements in the 2 input arrays
 * This function should run in O(n + m) time and O(n + m) space should not modify the parameters passed to it
 */

/**
 * Pseudocode - Merge Sort
 *
 * 1. Break up the array into halves until you have array that are empty or have one element
 * 2. Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you back at the full length of the array
 * 3. Once the array has been merged back together, return the merged (sorted) array
 */

/**
 * The function implements the merge sort algorithm to sort an array of elements recursively.
 * @param array - The `array` parameter is an array of elements that needs to be sorted using the merge
 * sort algorithm.
 * @returns The function `mergeSort` is returning the sorted array after dividing it into smaller
 * sub-arrays and merging them using the `merge` function.
 */
const mergeSort = (array) => {
  if (array.length <= 1) return array;

  /* These lines of code are dividing the input array into two halves recursively until each sub-array
  has only one element. */
  let mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));

  return merge(left, right);
};

console.log(mergeSort([1, 5, 4, 3, 90, 10, 78, 100]));
