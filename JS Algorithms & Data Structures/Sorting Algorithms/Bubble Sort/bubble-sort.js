/**
 * The function swaps the positions of two elements in an array.
 * @param array - The array parameter is an array that contains elements to be swapped.
 * @param idx1 - `idx1` is a parameter representing the index of the first element to be swapped in the
 * `array`.
 * @param idx2 - `idx2` is the index of the second element in the array that we want to swap with the
 * element at `idx1`.
 */
const swap = (array, idx1, idx2) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
};

/**
 * Pseudocode - Bubble Sort
 *
 * 1. Start looping from (with a variable called i) the end of the array towards the beginning
 * 2. Start an inner loop with a variable called j from the beginning until i - 1
 * 3. If arr[j] is greater than arr[j + 1], swap those 2 values
 * 4. Return the sorted array
 *
 * @param array - an array of numbers that needs to be sorted in ascending order using the naive bubble
 * sort algorithm.
 * @returns The function `naiveBubbleSort` is returning the sorted array after performing the bubble
 * sort algorithm.
 */
const naiveBubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }

  return array;
};

console.log(naiveBubbleSort([5, 3, 4, 1, 2]));
console.log(naiveBubbleSort([37, 45, 28, 8, 10]));

/**
 * Optimized Bubble Sort
 */
/**
 * The `bubbleSort` function implements the bubble sort algorithm to sort an array in ascending order.
 * @param array - The input array that needs to be sorted using the bubble sort algorithm.
 * @returns The sorted array is being returned.
 */
const bubbleSort = (array) => {
  /**
   * The outer loop starts from the end of the array and decrements by 1 in each iteration. The inner loop
   * starts from the beginning of the array and goes up to `i - 1`. In each iteration of the inner loop, it
   * compares the current element with the next element and swaps them if the current element is greater than
   * the next element. This way, the largest element "bubbles up" to the end of the array in each iteration of
   * the outer loop. The algorithm continues until the entire array is sorted in ascending order.
   */
  for (let i = array.length; i > 0; i--) {
    /**
     * The `isSwap` variable is used to keep track of
     * whether any swaps were made in the inner loop. If no swaps were made, it means that the array is
     * already sorted, and the algorithm can break out of the outer loop early. This optimization reduces
     * the number of iterations required to sort the array, making the algorithm more efficient.
     */
    let isSwap = true;

    for (let j = 0; j < i - 1; j++) {
      // console.log(array, array[j], array[j + 1]);
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        isSwap = false;
      }
    }

    if (isSwap) break;
  }

  return array;
};

console.log(bubbleSort([5, 3, 4, 1, 2]));
console.log(bubbleSort([1, 2, 3, 4, 5]));
console.log(bubbleSort([37, 45, 28, 8, 10]));
console.log(bubbleSort([37, 45, 28, 8, 10, -2, -10]));
