/**
 * QUESTION
 *
 * You're given an array of integers and an integer. Write a function that moves all instances of that integer in the array to the end of the array and returns the array.
 *
 * The function should perform this in place (i.e., it should mutate the input array) and doesn't need to maintain the order of the other integers.
 *
 * Sample Input:
 * array = [2, 1, 2, 2, 2, 3, 4, 2]
 * toMove = 2
 *
 * Sample Output:
 * [1, 3, 4, 2, 2, 2, 2, 2] // the numbers 1, 3, and 4 could be ordered differently
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this function is O(n), where n is the length of the input array. This is because the function uses a while loop to iterate through the array, and in the worst case scenario, it may have to iterate through the entire array once.

 * The space complexity of this function is O(1), because it does not use any additional data structures that grow with the size of the input array. It only uses a constant amount of extra space to store the left and right pointers.
 */
const moveElementToEnd = (array, toMove) => {
  let left = 0;
  let right = array.length - 1;

  // We're using 2 pointers to iterate through the array once
  while (left < right) {
    // As long as the left pointer is less than the right pointer
    // and the current value of right is equal to toMove value
    // we'll decrease the right pointer by one to slice to next value until
    // we found the next value that's not equal to toMove value
    while (left < right && array[right] === toMove) {
      right -= 1;
    }

    // If current left pointer value is equal to toMove value
    // we'll swap the left and right value
    if (array[left] === toMove) {
      swap(array, left, right);
    }

    // Otherwise, we'll increase the left by one to move to the next potential comparable value, which is not equal to the toMove value
    left += 1;
  }

  return array;
};

const swap = (array, left, right) => {
  [array[left], array[right]] = [array[right], array[left]];
};

const array = [2, 1, 2, 2, 2, 3, 4, 2];
const toMove = 2;
console.log(moveElementToEnd(array, toMove)); // [1, 3, 4, 2, 2, 2, 2, 2] - the numbers 1, 3, and 4 could be ordered differently

/**
 * SOLUTION 2
 *
 * The same approach and time complexity as previous solution
 * but different in implementation
 */
const moveElementToEnd2 = (array, toMove) => {
  let left = 0;
  let right = array.length - 1;

  // We're using 2 pointers to iterate through the array once
  while (left < right) {
    // If the right value isn't equal to toMove
    if (array[right] !== toMove) {
      // And if the left value is equal to toMove, then we swap position of left and right
      if (array[left] === toMove) {
        swap(array, left, right);
      }

      // Otherwise, we increase the left pointer to the next comparable value
      // which is the value is not equal to the toMove value
      left += 1;
    } else {
      // Otherwise, we decrease right pointer
      // until we found the next value that isn't equal to the toMove value
      right -= 1;
    }
  }

  return array;
};

console.log(moveElementToEnd2(array, toMove)); // [1, 3, 4, 2, 2, 2, 2, 2] - the numbers 1, 3, and 4 could be ordered differently
