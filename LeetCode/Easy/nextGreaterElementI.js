/**
 * https://leetcode.com/problems/next-greater-element-i/description/
 *
 * Brute Force Approach: We will use 2 nested-loop to iterate over the elements in both arrays.
 *
 * If we found the first array's element in the second array, we will iterate over the remaining second array's elements to find the greater element of the current first array's element.
 *
 * 1. We initialize an ans array to store the result.
 *
 * 2. In the outer loop, we iterate over the first array's elements, and we initialize a max variable to hold the greater value.
 *
 * 3. In the inner loop, we iterate over the second array's elements.
 * - 3.1: If we found the first array's element in the second array, we keep iterating over the remaining second array's elements to find the greater element of the current second first array's element.
 *
 * - 3.2: If we found greater element, we update the max variable to hold the greater one, and break the loop.
 *
 * - 3.3: Otherwise, we increase the `j` index to keep iterating through remaining elements.
 *
 * 4. Outside of the inner loop, we push the current max value into the ans array as the result.
 *
 * 5. After iterating through all the elements in the first array, we return ans as the result.
 *
 * Time complexity: O(n * m), where n is the length of nums1 and m is the length of nums2.
 *
 * Space complexity: O(n), where n is the length of nums1.
 *
 */
const nextGreaterElement = (nums1, nums2) => {
  let ans = [];
  let max = -1;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        while (j < nums2.length) {
          if (nums2[j] > nums1[i]) {
            max = nums2[j];
            break;
          }
          j++;
        }
      }
    }

    ans.push(max);
  }

  return ans;
};

/**
 * Stack & Map Approach:
 *
 * The key idea is to process nums2 in reverse order and use a stack to maintain a decreasing order of elements seen so far. This allows us to efficiently identify the next greater element for each element as we encounter it.
 *
 * The map is built during the processing of nums2 and stores the next greater element for each element, enabling quick lookups during the second loop for elements in nums1.
 *
 *
 * 1. We create a hash map (`map`) to store the next greater element for each element encountered in `nums2`.
 *
 * 2. We create a stack to keep track of elements seen in `nums2` during processing.
 *
 * 3. We iterate through `nums2` in reverse order. This approach allows us to populate the map with the next greater element as we encounter each element in `nums2`.
 *
 * 4. As long as there are elements in the stack and the top element of the stack is less than or equal to the current nums2's element.
 *
 * - 4.1: We keep removing elements to ensure that the top element on the stack is always a potential next greater element for elements encountered later in the loop. We only want the top element of the stack to be the one that greater than the current nums2's element.
 *
 * 5. After processing the stack, we assign the next greater element for `nums2[i]` to the map.
 *
 * - 5.1: If the stack is empty, it means there's no greater element for the current nums2's element, so -1 is assigned.
 *
 * - 5.2: Otherwise, the top element of the stack represents the next greater element for the current nums2's element, and it's assigned to the corresponding key (`nums2[i]`) in the map.
 *
 * 6. After processing current nums2's element, we pushed it onto the stack. This is because current nums2's element itself might be the next greater element for some element encountered later in the loop.
 *
 * 7. To find the next greater elements for nums1, we iterate through each element (`num`) in nums1, and check the map for the next greater element of the current num from nums1.
 *
 * - 7.1: If the current key exists in the map, its corresponding value (the next greater element) is retrieved and added to the ans array.
 *
 * - 7.2: If the current key doesn't exist in the map (meaning num wasn't present in nums2), `-1` is added to `ans` to indicate no greater element exists.
 *
 * 8. We return the `ans` array which contains the next greater element for each element in nums1 (or -1 if none exists).
 *
 * Time complexity: O(n + m), where n is the length of nums1 and m is the length of nums2.
 *
 * Space complexity: O(m), where m is the length of the map.
 */
const nextGreaterElement = (nums1, nums2) => {
  const map = {};
  const stack = [];

  // Build a map of element -> next greater element in nums2
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= nums2[i]) {
      stack.pop(); // Remove smaller elements from the stack
    }

    map[nums2[i]] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(nums2[i]); // Push current element onto the stack
  }

  // Find next greater elements for nums1 elements based on the map
  const ans = [];
  for (const num of nums1) {
    ans.push(map[num] || -1);
  }

  return ans;
};
