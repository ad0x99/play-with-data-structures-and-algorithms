/**
 * Counting sort is a sorting algorithm that works specifically on non-negative integer arrays. It's particularly efficient when the range of values in the input array is limited compared to the number of elements in the array.
 *
 * 1. Counting Occurrences: We iterate through the input array and counts the number of times each distinct value appears. This creates a "count array" where each index represents a possible value and the value at that index stores the count of how many times that value appeared in the original array.
 *
 * 2. Calculating cumulative sums: The count array is then modified to store the cumulative sum of frequencies up to that index. This means for each index i in the modified count array, the value countArray[i] represents the total number of elements less than or equal to i in the original array.
 *
 * 3. Placing elements
 * - 3.1: A new output array is created to store the sorted elements.
 * - 3.2: We iterate through the original array again.
 * - 3.3: For each element encountered in the original array, it uses the element's value as an index into the modified count array. The correct position of current element is at the position of its current counter - 1
 * - 3.4: The value at the index of `its current counter - 1` in the count array tells us the correct sorted position for the current element in the output array.
 * - 3.5: The element is placed in the output array at the position indicated by the count array value, and the count array value is decremented to reflect that one element of that value has been placed.
 *
 * For example: nums = [1, 2, 3, 0, 6, 0, 1, 1, 3]
 *
 * Step 1: Counting Occurrences
 * c[0] = 2, c[1] = 3, c[2] = 1, c[3] = 2, c[6] = 1
 *
 * Step 2: Calculating cumulative sums
 * c[0] = 2, c[1] = 3 -> 3 + 2 = 5, c[2] = 1 -> 5 + 1 = 6, c[3] = 2 -> 6 + 2 = 8, c[6] = 1 -> 8 + 1 - 9
 *
 * Step 3: Placing elements
 * sorted = [ 0, 0, 1, 1, 1, 2, 3, 3, 6 ]
 * nums = [ 1, 2, 3, 0, 6, 0, 1, 1, 3 ]
 * ans = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 *
 * num = 1
 * - count[num] -= 1 => count[1] -= 1 = 5 - 1 = 4 => count[num] = count[1] = 4
 * - ans[count[num]] = ans[4] = num => ans[4] = 1 => ans = [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ]
 *
 * num = 2
 * - count[num] -= 1 => count[2] -= 1 = 6 - 1 = 5 => count[num] = count[2] = 5
 * - ans[count[num]] = ans[5] = num => ans[5] = 2 => ans = [ 0, 0, 0, 0, 1, 2, 0, 0, 0 ]
 *
 * num = 3
 * - count[num] -= 1 => count[3] -= 1 = 8 - 1 = 7 => count[num] = count[3] = 7
 * - ans[count[num]] = ans[7] = num => ans[7] = 3 => ans = [ 0, 0, 0, 0, 1, 2, 0, 3, 0 ]
 *
 * num = 0
 * - count[num] -= 1 => count[0] -= 1 = 2 - 1 = 1 => count[num] = count[0] = 1
 * - ans[count[num]] = ans[1] = num => ans[1] = 0 => ans = [ 0, 0, 0, 0, 1, 2, 0, 3, 0 ]
 *
 * num = 6
 * - count[num] -= 1 => count[6] -= 1 = 9 - 1 = 8 => count[num] = count[6] = 8
 * - ans[count[num]] = ans[8] = num => ans[8] = 6 => ans = [ 0, 0, 0, 0, 1, 2, 0, 3, 6 ]
 *
 * num = 0
 * - count[num] -= 1 => count[0] -= 1 = 1 - 1 = 0 => count[num] = count[0] = 0
 * - ans[count[num]] = ans[0] = num => ans[0] = 0 => ans = [ 0, 0, 0, 0, 1, 2, 0, 3, 6 ]
 *
 * num = 1
 * - count[num] -= 1 => count[0] -= 1 = 4 - 1 = 3 => count[num] = count[1] = 3
 * - ans[count[num]] = ans[3] = num => ans[3] = 1 => ans = [ 0, 0, 0, 1, 1, 2, 0, 3, 6 ]
 *
 * num = 1
 * - count[num] -= 1 => count[0] -= 1 = 3 - 1 = 2 => count[num] = count[1] = 2
 * - ans[count[num]] = ans[2] = num => ans[2] = 1 => ans = [ 0, 0, 1, 1, 1, 2, 0, 3, 6 ]
 *
 * num = 3
 * - count[num] -= 1 => count[3] -= 1 = 7 - 1 = 6 => count[num] = count[3] = 6
 * - ans[count[num]] = ans[6] = num => ans[6] = 3 => ans = [ 0, 0, 1, 1, 1, 2, 3, 3, 6 ] => sorted
 *
 *
 * Time complexity: O(n + k) - where n is the length of the array and k is the maximum element of the array.
 *
 * Space complexity: O(n + k)
 */
const countingSort = (nums) => {
  // Step 1: Find the largest element in nums array and create a count array to store the occurrences of the distinct element.
  let largest = Math.max(...nums);
  let counter = new Array(largest + 1).fill(0);

  for (let num of nums) {
    counter[num] += 1;
  }

  // Step 2: Calculating cumulative sums (it's the same as the prefix sum)
  for (let i = 1; i < largest + 1; i++) {
    counter[i] += counter[i - 1];
  }

  // Step 3: Placing elements at the correct position
  let n = nums.length;
  let ans = new Array(n).fill(0);

  for (let num of nums) {
    counter[num] -= 1;
    ans[counter[num]] = num;
  }

  return ans;
};

console.log(countingSort([1, 2, 3, 0, 6, 0, 1, 1, 3])); // [ 0, 0, 1, 1, 1, 2, 3, 3, 6 ]

/**
 * The above implementation is not a stable counting sort algorithm. In order to make it stable, at the element replacement step, instead of iterating through all elements from the beginning of the array, we will iterate through all elements from the end of the array
 */
const countingSortStable = (nums) => {
  // Step 1: Find the largest element in nums array and create a count array to store the occurrences of the distinct element.
  let largest = Math.max(...nums);
  let counter = new Array(largest + 1).fill(0);

  for (let num of nums) {
    counter[num] += 1;
  }

  // Step 2: Calculating cumulative sums (it's the same as the prefix sum)
  for (let i = 1; i < largest + 1; i++) {
    counter[i] += counter[i - 1];
  }

  // Step 3: Placing elements at the correct position
  let n = nums.length;
  let ans = new Array(n).fill(0);

  // Reverse the iteration from end to start
  for (let i = n - 1; i >= 0; i--) {
    const currentVal = nums[i];

    counter[currentVal]--;
    ans[counter[currentVal]] = currentVal;
  }

  return ans;
};

console.log(countingSortStable([1, 2, 3, 0, 6, 0, 1, 1, 3])); // [ 0, 0, 1, 1, 1, 2, 3, 3, 6 ]
