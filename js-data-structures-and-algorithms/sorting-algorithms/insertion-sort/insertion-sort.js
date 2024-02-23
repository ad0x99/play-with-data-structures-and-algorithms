/**
 * Pseudocode - Insertion Sort
 *
 * 1. Start by picking the second element in the array
 * 2. Then compare the second element with the one before it and swap if necessary
 * 3. Continue to the next element and if it is in the incorrect order, iterate through the sorted portion (i.e. the left side) to place the element in the correct place
 * 4. Repeat until the array is sorted
 */

/**
 * The function implements the insertion sort algorithm to sort an array in ascending order.
 * @param array - The input array that needs to be sorted using the insertion sort algorithm.
 * @returns The sorted array is being returned.
 */
const insertionSort = (array) => {
  /* It is iterating through the array
starting from the second element (i.e. `let i = 1`) and comparing it with the element before it. If
the element before it is greater than the current element, it shifts the element before it to the
right and continues iterating backwards until it finds the correct position for the current element.
Once it finds the correct position, it inserts the current element at that position. This process
continues until the entire array is sorted. */
  for (let i = 1; i < array.length; i++) {
    let j;
    let currentValue = array[i];

    /* This code block is iterating through the sorted portion of the array (i.e. the left side) to
    find the correct position for the current element being sorted. It starts at the element just
    before the current element (i.e. `j = i - 1`) and continues iterating backwards as long as the
    index is greater than or equal to 0 and the value at that index is greater than the current
    value being sorted (i.e. `j >= 0 && array[j] > currentValue`). During each iteration, it shifts
    the value at the current index one position to the right (i.e. `array[j + 1] = array[j]`). Once
    it finds the correct position for the current element, it breaks out of the loop and inserts the
    current value at the correct index (i.e. `array[j + 1] = currentValue`). */
    for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
      array[j + 1] = array[j];
    }

    array[j + 1] = currentValue;
  }

  return array;
};

console.log(insertionSort([2, 1, 9, 76, 4]));
