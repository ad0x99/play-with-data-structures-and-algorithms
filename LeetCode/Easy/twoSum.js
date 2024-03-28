/**
 * https://leetcode.com/problems/two-sum/description/
 *
 * This solution is suitable for unsorted array
 *
 * The time complexity of this solution is O(n) because we iterate through the array of numbers only once. The space complexity is also O(n) because we use a hashmap to store encountered numbers, which can potentially store all the numbers in the input array.
 *
 * The use of a hashmap allows us to achieve a linear time complexity by trading off space complexity. The hashmap enables us to quickly look up whether a complement number (target - current number) has been encountered before in O(1) time. This efficient lookup operation helps us find the indices of the two numbers that add up to the target sum without needing to iterate through the array multiple times.
 */
const twoSumWithHashmap = (nums, target) => {
  // We use a hashmap to store encountered number
  let temp = {};

  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // Checks if the current number exists as a key in the hashmap.
    // If it does, it means that we have already encountered a number in the array that, when added to the current number, gives the target sum. In this case, we return an array containing the index of the previously encountered number and the current index.
    if (temp[nums[i]] >= 0) {
      return [temp[nums[i]], i];
    }

    // Store the index `i` of the current number in the hashmap.
    temp[target - nums[i]] = i;
  }
};

console.log(twoSumWithHashmap([2, 11, 7, 15], 9)); // [0, 1]
console.log(twoSumWithHashmap([3, 2, 4], 6)); // [1, 2]
console.log(twoSumWithHashmap([3, 3], 6)); // [0, 1]
