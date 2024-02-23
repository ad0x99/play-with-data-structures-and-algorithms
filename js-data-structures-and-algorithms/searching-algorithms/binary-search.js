/**
 * [Binary Search](https://www.geeksforgeeks.org/binary-search/)
 *
 * This function accepts a sorted array and a value
 * Create a left pointer at the start of the array, and a right pointer at the end of the array
 * While the left pointer comes before the right pointer, then create a pointer in the middle
 * If find the value, return the index
 * If the value is too small, move the left pointer up
 * If the value is too large, move the right pointer down
 * If never find the value, return -1
 */

/**
 * The binarySearch function implements the binary search algorithm to find a target value in a sorted
 * array.
 * @param array - The array parameter is an array of numbers that will be searched using the binary
 * search algorithm.
 * @param value - The value parameter is the target value that we are searching for in the array using
 * the binary search algorithm.
 * @returns the index of the target value in the array if it is found, or -1 if it is not found.
 */
const binarySearch = (array, value) => {
  let start = 0;
  let end = array.length - 1;
  let middle = Math.floor((start + end) / 2);

  /* This is the implementation of the binary search algorithm. It creates a loop that continues until
 either the value is found in the array or the start pointer is greater than the end pointer. It
 calculates the middle index of the array and compares the value at that index to the target value.
 If the target value is greater than the middle value, it updates the start pointer to be one index
 greater than the middle index. If the target value is less than the middle value, it updates the
 end pointer to be one index less than the middle index. It then recalculates the middle index and
 repeats the process until the target value is found or the start pointer is greater than the end
 pointer. */
  while (array[middle] !== value && start <= end) {
    if (value > array[middle]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }

    middle = Math.floor((start + end) / 2);
  }

  if (array[middle] === value) return middle;
  return -1;
};

console.log(binarySearch([1, 2, 3, 4, 5], 2)); // 1
console.log(binarySearch([1, 2, 3, 4, 5], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)); // -1
console.log(
  binarySearch(
    [
      5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
      99,
    ],
    10
  )
); // 2
console.log(
  binarySearch(
    [
      5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
      99,
    ],
    95
  )
); // 16
console.log(
  binarySearch(
    [
      5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98,
      99,
    ],
    100
  )
); // -1
