/**
 * https://leetcode.com/problems/3sum-smaller/description/
 * https://www.lintcode.com/problem/3sum-smaller/description
 *
 * Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.
 *
 * The idea is to use two pointers technique to calculate the expected sum
 *
 * 1. In order to use two pointers, we have to sort the array
 * 2. We declare a answer variable to store the count of valid pair of sum
 * 3. We need to find 3 values that match the condition of nums[i] + nums[j] + nums[k] < target and i < j < k. Therefore, the correct pair nums[i] + nums[j] + nums[k] < target => nums[i] + nums[j] < target - nums[k].
 * 4. We fix the value of nums[k], and iterate through the array from k = 2 to nums - 1.
 * 5. We start with i = 0 and j = k - 1.
 * 6. As long as the i < k, we iterate through the array and check.
 * 7. If the current value of i plus current value of j is less than target, then there are a valid [i, j] pairs, we add up it to the answer. Because in that case, when nums[k] and nums[i] are fixed, moving j to the left side always causes nums[i] + nums[j] < target - nums[k].
 * 8. We increase i by 1 to try another nums[i] in the range between i and j.
 * 9. Otherwise, we decrease j by 1 to get lower sum. Because nums[k] is fixed, to make the inequality correct, we need to decrease sum of nums[i] + nums[j].
 *
 * The time complexity of this solution is O(n) * O(n) = O(n^2), where n is the number of elements in the input array nums. This is because we are iterating through the array once with the outer loop, and for each element, we are performing a two-pointer approach within the inner loop.
 *
 * The space complexity is O(1). We are only using a constant amount of extra space for variables like sum, left, right, and answer.
 */
const threeSumSmaller = (nums, target) => {
  nums.sort((a, b) => a - b);
  let answer = 0;

  for (let k = 2; k < nums.length; k++) {
    let i = 0;
    let j = k - 1;

    while (i < j) {
      if (nums[i] + nums[j] < target - nums[k]) {
        answer += j - i;
        i += 1;
      } else {
        j -= 1;
      }
    }
  }

  return answer;
};

const nums1 = [-2, 0, 1, 3];
//              i     j  k
const target1 = 2;
// Because there are two triplets which sums are less than 2:
// [-2, 0, 1], [-2, 0, 3]
console.log(threeSumSmaller(nums1, target1)); // 2

const nums2 = [-2, 0, -1, 3];
const target2 = 2;
// Because there are three triplets which sums are less than 2:
// [-2, 0, -1]
// [-2, 0, 3]
// [-2, -1, 3]
console.log(threeSumSmaller(nums2, target2)); // 3
