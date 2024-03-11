/**
 * https://leetcode.com/problems/minimum-size-subarray-sum/description/
 *
 * The idea is using the sliding window technique to find the potential minimal length in each subarray.
 *
 * 1. The left pointer keeps track of the left index of the current subarray window. The curSum stores the current sum of elements within the window and the minLength holds the minimum length of a subarray found so far. It's initialized with Infinity to ensure any valid subarray length will be smaller.
 * 2. We iterate through the array with the right represents the current index (right pointer) and nums[right] is the current element.
 * 3. We increment the current sum by adding the current element to the window sum.
 * 4. As long as the current sum is greater than or equal to the target. This ensures we only consider subarrays with a sum exceeding the target.
 * 5. We compare the potential subarray length (r - l + 1 - because the array is start from zero, we have to minus 1) with the current length, then get the smaller length and update the current sum.
 * 6. After that, we remove the current left from the window sum and move the window one element to the right. This process shrinks the window from the left side until the sum no longer meets the condition.
 *
 * The time complexity of this function is O(n), where n is the number of elements in the input array nums. This is because we iterate through the array once with two pointers (left and right), and the while loop inside the for loop slides the window at most n times.
 *
 * The space complexity is O(1) because we are using a constant amount of extra space regardless of the size of the input array. We only use a few variables to keep track of the left pointer, current sum, and minimum length.
 */
const minSubArrayLen = (target, nums) => {
  let left = 0; // Left pointer for window
  let curSum = 0; // Current sum of the window
  let minLength = Infinity; // Minimum length found so far (initialize with Infinity)

  // Iterate through the array
  for (let right = 0; right < nums.length; right++) {
    // Add current element to the window sum
    curSum += nums[right];

    // Slide the window until the sum is no longer greater than or equal to the target
    while (curSum >= target) {
      // Update minimum length if the current window is smaller than the previous minimum
      minLength = Math.min(minLength, right - left + 1);

      // Subtract the leftmost element from the sum and move the left pointer
      curSum -= nums[left];
      left++;
    }
  }

  // Return 0 if no subarray is found, otherwise return the minimum length
  return minLength === Infinity ? 0 : minLength;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2 - The subarray [4,3] has the minimal length under the problem constraint.
console.log(minSubArrayLen(4, [1, 4, 4])); // 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); // 0
