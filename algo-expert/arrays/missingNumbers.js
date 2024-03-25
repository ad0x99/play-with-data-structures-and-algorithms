/**
 * QUESTION
 *
 * You're given an unordered list of unique integers nums in the range [1, n], where n represents the length of nums + 2. This means that two numbers in this range are missing from the list.
 *
 * Write a function that takes in this list and returns a new list with the two missing numbers, sorted numerically
 *
 * Sample Input:
 * nums = [1, 4, 3]
 *
 * Sample Output:
 * [2, 5] // n is 5, meaning the completed list should be [1, 2, 3, 4, 5]
 */

/**
 * SOLUTION 1
 *
 * Pseudocode - The idea is to compare the input array and the expected array which has a range of `1` to the `n` `[1, n]`.
 * 1. We create a new Set to store the input array's numbers, and an array to store the missing numbers
 * 2. We loop through the array from `1` to `nums.length + 2`
 * 3. Each time we loop through the array, we'll check if the current index is already in the Set that we've created in the beginning.
 * 4. If the current index is not in the Set, that means the current index is the missing number, then we push into the missing numbers array
 * 5. Otherwise, we continue with the next iteration
 *
 * The time complexity of this function is O(n), where n is the length of the input array nums. This is because the function iterates through all numbers from 1 to nums.length + 2 once to check for missing numbers.
 *
 * The space complexity of this function is also O(n), as it creates a Set to store the included numbers and an array to store the missing numbers. The size of these data structures scales linearly with the input array size.
 */
export const missingNumbersWithSet = (nums) => {
  const includedNumbers = new Set(nums);
  const missingNumbers = [];

  for (let num = 1; num <= nums.length + 2; num++) {
    if (!includedNumbers.has(num)) {
      missingNumbers.push(num);
    }
  }

  return missingNumbers;
};

/**
 * SOLUTION 2
 *
 * The idea is to use the sum of the numbers to find the missing numbers.
 *
 * 1. We need to calculate the sum of all the numbers of the expected array, and the input array.
 * 2. By using the above total sum of 2 arrays, we can find the average sum of the expected array. After that, because the average will approximately be in the middle of the array, therefore, we can assume that some missing numbers must be to the left of the average and the others must be to the right
 * 3. From that assumption, we will calculate the sum of left and sum of the right from the average. We loop through the input array and if the current number is less than or equal to the average, we calculate the sum of the left, otherwise, we calculate the sum of the right.
 * 4. At this time, we have the sum of the left and the right of both the expected array and the input array. To find the missing number on the left, we use the total sum of all the numbers on the left of the expected array minus the sum of the left of the input array, and similarly for the right side.
 * 5. The different of calculation for the left and right are the missing numbers
 *
 * The time complexity of this function is O(n) because it iterates through the input array `nums` twice, once to calculate the total sum and once to calculate the sum of the left and right halves. The time complexity of the `sumOfArrayFromTo` function is also O(n) because it iterates from `start` to `end` in a loop.
 *
 * The space complexity of this function is O(1) because it only uses a constant amount of extra space regardless of the size of the input array `nums`. The `sumOfArrayFromTo` function also has a space complexity of O(1) because it only uses a constant amount of extra space.
 */
export const missingNumbersWithSum = (nums) => {
  // Calculate sum of expected array
  let totalSum = sumOfArrayFromTo(1, nums.length + 2);

  // Calculate sum of input array
  for (let num of nums) {
    totalSum -= num;
  }

  // Get the average sum of the input array
  // The average is calculated by (sumOfExpectedArray - sumOfInputArray) / 2
  let average = Math.floor(totalSum / 2);
  let sumOfInputLeftHalf = 0;
  let sumOfInputRightHalf = 0;

  for (let num of nums) {
    if (num <= average) {
      sumOfInputLeftHalf += num;
    } else {
      sumOfInputRightHalf += num;
    }
  }

  let sumOfExpectedLeftHalf = sumOfArrayFromTo(1, average);
  let sumOfExpectedRightHalf = sumOfArrayFromTo(average + 1, nums.length + 2);
  let leftMissingNumber = sumOfExpectedLeftHalf - sumOfInputLeftHalf;
  let rightMissingNumber = sumOfExpectedRightHalf - sumOfInputRightHalf;

  return [leftMissingNumber, rightMissingNumber];
};

const sumOfArrayFromTo = (start, end) => {
  let sum = 0;

  for (let num = start; num <= end; num++) {
    sum += num;
  }

  return sum;
};

/**
 * SOLUTION 3
 *
 * The idea is to using xor to find the difference between the expected array and the input array. Because the xor of the same value is always equal to zero, we will eliminate the duplicate numbers, and the left will be the missing numbers
 *
 * 1. Get the set bit of 2 missing numbers
 * 2. From the expected array, find the number has the same set bit as the set bit of xor of 2 missing numbers
 * 3. When we found the number has the same set bit, we xor all of that numbers to find the first missing number from the expected array
 * 4. Otherwise, we do the same thing with the number that did not have the same bit set to find the second missing number from the expected array
 *
 * The time complexity of this solution is O(n), where n is the length of the input array nums. This is because we iterate through the array twice, once to calculate the XOR of all numbers and once to calculate the XOR of missing numbers.
 *
 * The space complexity is O(1) because we are using a constant amount of extra space regardless of the input size.
 */
export const missingNumbersWithBitwise = (nums) => {
  // Do the xor of all the numbers on the expected array
  // Then all of the duplicates will end up canceling themselves out
  let xor = 0;

  // Iterate through the expected range
  // After this iteration, we'll get the xor of 2 missing numbers
  for (let num = 0; num <= nums.length + 2; num++) {
    xor ^= num;

    // If the current value is in the range of nums
    // we do the xor by the value of current nums at num
    if (num < nums.length) {
      xor ^= nums[num];
    }
  }

  // After finding the xor of 2 missing numbers
  // we continue to find what those numbers are
  // we initialize an array to store the missing numbers, with the initial values are 0. We use the zero because we can do the xor
  let solution = [0, 0];
  // Get first rightmost set bit by using bitwise & with negative value of xor
  let setBit = xor & -xor;

  // Iterate through the expected range
  // and using set bit to find the missing numbers
  for (let num = 0; num <= nums.length + 2; num++) {
    // Check if does num have the bit set or not
    // The number has set bit is the number has a 1 in the binary representation (set bit only has a single 1)

    if ((num & setBit) === 0) {
      // If the current number ended in a bitwise and the end of these set bit is equal to zero
      // That means its position is the right of the array, then we update the first position of the solution array to the xor of the current number
      solution[0] ^= num;
    } else {
      // Otherwise, we update the first position
      solution[1] ^= num;
    }

    // If the current number is in the range of input array
    if (num < nums.length) {
      // If the current number does not have the set bit
      // we do xor of the current number and update the first missing number
      if ((nums[num] & setBit) === 0) {
        solution[0] ^= nums[num];
      } else {
        // Otherwise, if the current number does have the set bit
        // we do xor of the current number and update the second missing number
        solution[1] ^= nums[num];
      }
    }
  }

  return solution.sort((a, b) => a - b);
};
