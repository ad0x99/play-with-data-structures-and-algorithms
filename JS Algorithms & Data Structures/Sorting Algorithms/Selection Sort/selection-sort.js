import { swap } from '../common/swap.js';

/**
 * Pseudocode - Selection Sort
 *
 * 1. Store the first element as the smallest value you've seen so far
 * 2. Compare this item to then next item in the array until you find a smaller number
 * 3. If a smaller is found, designate that smaller number to be the new minimum and continue until the end of the array
 * 4. If the minimum is not the value (index) you initially began with, swap the two values
 * 5. Repeat this with next element until the array is sorted
 */

/**
 * The selectionSort function sorts an array in ascending order by iterating through the array and
 * swapping the current element with the smallest element found in the rest of the array.
 * @param array - The input array that needs to be sorted using the selection sort algorithm.
 * @returns The sorted array is being returned.
 */
const selectionSort = (array) => {
  /* The outer loop iterates through the
  array from the first element to the last element. The inner loop starts from the next element of
  the outer loop and iterates through the rest of the array to find the index of the smallest
  element. Once the index of the smallest element is found, it is swapped with the current element
  of the outer loop. This process is repeated until the array is sorted in ascending order. */
  for (let i = 0; i < array.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowest]) {
        lowest = j;
      }
    }

    if (i !== lowest) swap(array, lowest, i);
  }

  return array;
};

console.log(selectionSort([34, 22, 10, 19, 17]));
