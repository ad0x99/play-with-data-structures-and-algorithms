/**
 * https://leetcode.com/problems/subarray-product-less-than-k/description/
 *
 * Brute Force Approach: We use 2 nested loops to iterate through the array. Each time iteration, we calculate the product of the current number, such that the product is less than k, then we count the valid subarray that has the product less than k.
 *
 * Time complexity: O(n^2) because we have nested loops that iterate through the array. The outer loop runs n times, and the inner loop runs n-i times, where i is the current index of the outer loop. This results in a total of n*(n+1)/2 iterations, which simplifies to O(n^2) in big O notation.
 *
 * Space complexity: O(1)
 */
const numSubarrayProductLessThanKBruteForce = (nums, k) => {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let product = 1;

    for (let j = i; j < nums.length; j++) {
      product *= nums[j];

      if (product >= k) {
        break;
      }

      count += 1;
    }
  }

  return count;
};

/**
 * Sliding Window Approach: Using left and right pointers as both side of the window, and iterate through the array to find potential subarray such that has the product less than k.
 *
 * 1. We handle the edge case as the k is less than or equal to the 1, we return 0. Because if k is less than or equal to 1, it means we're looking for subarrays with a product of 0 or 1, which won't exist for any non-zero numbers in the array.
 * 2. We declare the left and right pointers start from 0, and we need a product variable to keep track the product of each subarray.
 * 3. We iterate through each element in the array, with the right pointer starts from 0 and goes up to the length of the array.
 * 4. Inside the loop, the current element is multiplied with the current product and stored back in product. This effectively calculates the product of elements from the beginning of the array (inclusive of left) up to the current index right.
 * 5. As long as the product is greater than or equal to k, that means it's a invalid product, the product will be divided by the element at the left index (nums[left]). This effectively removes the contribution of the leftmost element from the product since we're going to move the window to the right (exclude the leftmost element).
 * 6. We increase the left pointer by 1. This moves the window one element to the right for the next iteration of the while loop.
 * 7. After removing the invalid product (that means the products greater than or equal to k), at this time, a valid subarray has been found with the subarray starts at index left and ends at index right (inclusive). The number of elements in this valid subarray will be equal to right - left + 1. Therefore, we add the number of valid subarray which is right - left + 1 to the count variable.
 * 8. We keep iterate through each element of the array and return the count.
 *
 * Time complexity: O(n), where n is the length of the input array nums.
 *
 * Space complexity: O(1)
 */
const numSubarrayProductLessThanKSlidingWindow = (nums, k) => {
  if (k <= 1) return 0;

  let count = 0;
  let left = 0;
  let product = 1;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  }

  return count;
};
