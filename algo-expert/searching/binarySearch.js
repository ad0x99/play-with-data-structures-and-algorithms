/**
 * QUESTION
 *
 * Write a function that takes in a sorted array of integers as well as a target integer. The function should use the Binary Search algorithm to determine if the target integer is contained in the array and should return its index if it is, otherwise return -1
 *
 * Sample Input:
 * array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]
 * target = 33
 *
 * Sample Output:
 * 3
 */

/**
 * SOLUTION
 *
 * The idea is we have 2 pointers on the left and the right of the array.
 * The left pointer will start from 0 which means starting point of the array.
 * The right pointer will start from the position array.length - 1 which means the end of the array.
 *
 * We get the middle position by calculating (left + right) / 2 and using the Math.floor method to round the number down to the closest number.
 *
 * In the while loop, as long as the middle value is not equal to the target value and the left pointer is less than or equal to the right, we will traverse through the array and update corresponding left/right indexes.
 *
 * - If the target is greater than the middle value, we should update the left index by increasing it by 1, because we want to find the next potential value in the higher range starting from the middle position
 * - Otherwise, if the target is less than the middle value, we should decrease the right index by 1, because we want to find the next potential value in the lower range starting from the middle position
 * - After that, we re-calculate the mid index in the new (left/or right) range and update the mid index
 *
 * Out of the loop, we check If the middle value is equal to the target, which means we found the correct value and then we'll return its index. In contrast, we return the -1
 */
export const binarySearch = (array, target) => {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (array[mid] !== target && left <= right) {
    if (target > array[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }

    mid = Math.floor((left + right) / 2);
  }

  if (array[mid] === target) return mid;
  return -1;
};

const array1 = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73];
console.log(binarySearch(array1, 33)); // 3
