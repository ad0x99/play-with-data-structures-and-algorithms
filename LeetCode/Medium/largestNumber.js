/**
 * https://leetcode.com/problems/largest-number/description/
 *
 * Sorting Approach
 *
 * Idea: We will convert a list of numbers into a list of strings. And perform comparison of concatenation between each string of number to get the larger one.
 *
 * 1. We iterate though the list, convert each number into string.
 *
 * 2. We call the sort function with custom comparison function.
 *
 * 3. We create a compare function to compare the concatenation between two string of numbers.
 * - 3.1: This function takes two strings representing digits that need to be compared for sorting.
 *
 * - 3.2: We concatenate the two strings in both orders to create two new strings.
 *
 * - 3.3: We then compare these two concatenated strings. If `firstNumber + secondNumber` is greater than `secondNumber + firstNumber`, it means the first number followed by the second number creates a larger number, we return -1 to tell the sort method to move the first number ahead in the sorting order. Otherwise, if `secondNumber + firstNumber` is greater, it means the second number followed by the first number creates a larger number. In this case, we return 1 to tell the sort method to move the second number ahead.
 *
 * 4. After sorting, the nums array will contain the strings representing the original numbers in a specific order determined by the compare function.
 *
 * - 4.1: We will join all the strings in the sorted nums to create a single string representing the largest number.
 *
 * - 4.2: We remove any leading zeros to ensure that the largest number doesn't start with unnecessary zeros.
 *
 * - 4.3: Finally, in case the resulting string is empty after removing leading zeros (''), we return the string "0" as the default largest number.
 *
 *
 * Time complexity: O(n) + O(log) * O(n) = O(n log n), where n is the number of elements in the nums array
 *
 * Space complexity: O(n), where n is the number of elements in the nums array
 */
const largestNumber = (nums) => {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    nums[i] = nums[i].toString();
  }

  return nums.sort(compare).join('').replace(/^0+/, '') || '0';
};

const compare = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber > secondNumber + firstNumber ? -1 : 1;
};
