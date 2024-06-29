/**
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 *
 * Counting Sort Approach
 *
 * Idea: Sort the elements by its frequency and return the k elements from sorted array.
 *
 * 1. We create a frequencies Map to store the frequency of the each element from the nums array.
 *
 * 2. We iterate through each element, count the frequency and push into frequencies Map.
 *
 * 3. We sort the elements by frequency.
 *
 * 4. We create an result array to store the most frequent elements from sorted array.
 *
 * 5. We iterate through each element, and push k unique sorted element into result array. Inside the loop:
 * - 5.1: If the current number is not existed in result array, and the result array's length is less than k (because we want to push unique element and k elements into the result array), we then push the current number into result array.
 *
 * - 5.2: If the result array contains exact k elements, we immediately break the loop to avoid redundant iteration.
 *
 * 6. We return the result array which contains the most frequent elements.
 *
 * Time complexity: O(n log n), where n is the number of elements in nums array
 *
 * Space complexity: O(n), where n is the number of elements in frequencies Map
 */
const topKFrequent = (nums, k) => {
  const frequencies = new Map();
  for (const num of nums) {
    frequencies.set(num, (frequencies.get(num) || 0) + 1);
  }

  nums.sort((a, b) => {
    return frequencies.get(b) - frequencies.get(a);
  });

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (!result.includes(nums[i]) && result.length < k) {
      result.push(nums[i]);
    }

    if (result.length === k) break;
  }

  return result;
};

/**
 * Bucket Sort Approach
 *
 * Idea: We count the frequency of each element. And then we store each element into specific bucket based on its frequency. After that, we sort the element based on the frequency in the bucket.
 *
 * 1. We create a frequencies Map to store the frequency of each number.
 *
 * 2. We iterate through each element, count the frequency and push into frequencies Map.
 *
 * 3. We create a bucket array with a length equal to the maximum possible frequency (nums.length + 1) where each element is an empty array.
 *
 * 4. We iterate through the key-value pairs of the frequencies map. For each number (num) and its frequency (freq), we push the num to the bucket[freq] array. This essentially creates buckets where each bucket index represents a frequency and the array at that index stores the numbers that have that frequency.
 *
 * 5. We initialize an empty array sortedUniqueNums to store the final result (k most frequent numbers).
 *
 * 6. We iterate through the bucket array in reverse order. This ensures that higher frequencies are processed first.
 * - 6.1: We iterate through the numbers (num) stored in the current bucket bucket[freq], and check if the current number (num) already exists in the sortedUniqueNums array, we continue to next number. This avoids adding duplicate numbers even if they have the same frequency.
 *
 * - 6.2: If the number is not yet present, we push the num to the sortedUniqueNums array.
 *
 * 7. After iterating through all buckets and collecting numbers, we extract and return the first k elements from the array, representing the k most frequent numbers encountered in the original sortedUniqueNums array.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(n), where n is the number of elements in the frequencies Map, bucket array, and sortedNums array.
 */
const topKFrequent = (nums, k) => {
  const frequencies = new Map();
  for (const num of nums) {
    frequencies.set(num, (frequencies.get(num) || 0) + 1);
  }

  const bucket = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of frequencies.entries()) {
    bucket[freq].push(num);
  }

  const sortedUniqueNums = [];
  for (let freq = nums.length; freq >= 0; freq--) {
    for (const num of bucket[freq]) {
      if (sortedUniqueNums.includes(num)) continue;
      sortedUniqueNums.push(num);
    }
  }

  return sortedUniqueNums.slice(0, k);
};
