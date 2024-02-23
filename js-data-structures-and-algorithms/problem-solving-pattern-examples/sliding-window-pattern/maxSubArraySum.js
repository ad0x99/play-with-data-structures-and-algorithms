/**
 * Write a function called **maxSubArraySum** which accepts an array of integers and a number called **n**. The function should calculate the maximum sum of **n** consecutive elements in the array
 */

/**
 * The function finds the maximum sum of a subarray of a given length within an array.
 * @param array - The input array of numbers from which we need to find the maximum sum of a subarray.
 * @param num - The parameter `num` represents the number of consecutive elements to be summed up in
 * the array. The function `maxSubArraySum` finds the maximum sum of `num` consecutive elements in the
 * given array.
 * @returns The function `maxSubArraySum` returns the maximum sum of `num` consecutive elements in the
 * `array`. If `num` is greater than the length of the `array`, the function returns `null`.
 * Time complexity: O(n^2)
 * Space complexity: O(1)
 */

const maxSubArraySumNAIVE = (array, num) => {
  if (num > array.length) return null;

  let max = -Infinity;

  /**
   *  We don't want to go all the way to the end of the array
   * So we'll end our sliding when we hit the
   * end of the array with our consecutive number
   * by using array.length - num + 1
   */
  for (let i = 0; i < array.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += array[i + j];
    }

    if (temp > max) max = temp;
  }

  return max;
};

console.log(maxSubArraySumNAIVE([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubArraySumNAIVE([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubArraySumNAIVE([4, 2, 1, 6], 1)); // 6
console.log(maxSubArraySumNAIVE([4, 2, 1, 6, 2], 4)); // 13
console.log(maxSubArraySumNAIVE([], 4)); // null

/**
 * The function finds the maximum sum of a subarray of a given length in an array using a sliding
 * window approach.
 * @param array - The input array of numbers from which we need to find the maximum sum of a subarray.
 * @param num - The parameter `num` represents the number of consecutive elements to be summed up in
 * the array. The function `maxSubArraySumBestApproach` returns the maximum sum of `num` consecutive
 * elements in the array.
 * @returns The function `maxSubArraySumBestApproach` returns the maximum sum of `num` consecutive
 * elements in the `array`. If `num` is greater than the length of the `array`, it returns `null`.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const maxSubArraySumBestApproach = (array, num) => {
  let maxSum = 0;
  let tempSum = 0;

  if (num > array.length) return null;

  // First, we calculate the sum of the **num** elements of the array, then assign the the tempSum
  for (let i = 0; i < num; i++) {
    maxSum += array[i];
  }
  tempSum = maxSum;

  //  We loop through the array with starting point as the num where we've left at the first loop
  //  Then, we remove the first element of the first slide and add the next element after the end element of the slide and calculate the sum of the new slide
  for (let i = num; i < array.length; i++) {
    tempSum = tempSum - array[i - num] + array[i];

    // Pick the larger sum
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
};

console.log(maxSubArraySumBestApproach([1, 2, 5, 2, 8, 1, 5], 2)); // 10
console.log(maxSubArraySumBestApproach([1, 2, 5, 2, 8, 1, 5], 4)); // 17
console.log(maxSubArraySumBestApproach([4, 2, 1, 6], 1)); // 6
console.log(maxSubArraySumBestApproach([4, 2, 1, 6, 2], 4)); // 13
console.log(maxSubArraySumBestApproach([], 4)); // null
