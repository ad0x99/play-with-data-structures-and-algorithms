/**
 * The function swaps the positions of two elements in an array.
 * @param array - The array parameter is an array that contains elements to be swapped.
 * @param idx1 - `idx1` is a parameter representing the index of the first element to be swapped in the
 * `array`.
 * @param idx2 - `idx2` is the index of the second element in the array that we want to swap with the
 * element at `idx1`.
 */
export const swap = (array, idx1, idx2) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
};
