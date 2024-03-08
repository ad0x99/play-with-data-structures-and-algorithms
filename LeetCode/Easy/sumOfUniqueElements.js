/**
 * https://leetcode.com/problems/sum-of-unique-elements/description/
 *
 *
 * The time complexity of this solution is O(n) * O(n) => O(n), where n is the number of elements in the input array nums. This is because we iterate through the array twice, once to count the frequency of each element and once to calculate the sum of unique elements.
 *
 * The space complexity is O(101) => O(1) because we are using a fixed-length array of size 101 to store the frequency of each element, regardless of the size of the input array nums.
 *
 */
const sumOfUniqueElements = (nums) => {
  // We have a constraint of `1 <= nums[i] <= 100`
  // So we can leverage this condition to create fixed-length array of 101 (because the array starts from zero)
  let frequency = new Array(101).fill(0);
  let sum = 0;

  // Each time we iterate through the array, we count the frequency of the current number by increasing by 1
  // By doing so, if a number that has the frequency is equal to the 1, that means it just appear once => unique
  for (const num of nums) {
    frequency[num] += 1;
  }

  // In this iteration, we will iterate through the array again, and count the sum of the unique elements
  for (const num of nums) {
    if (frequency[num] === 1) {
      sum += num;
    }
  }

  return sum;
};

const nums1 = [1, 2, 3, 2];
const nums2 = [1, 1, 1, 1, 1];
const nums3 = [1, 2, 3, 4, 5];
console.log(sumOfUniqueElements(nums1)); // 4
console.log(sumOfUniqueElements(nums2)); // 0
console.log(sumOfUniqueElements(nums3)); // 15
