/**
 * https://leetcode.com/problems/special-array-i/
 *
 * The idea is to iterate through each element and check the parity of each element.
 *
 * 1. Base case: If the array is empty or has only one element, it doesn't qualify as a "special" array because there are no adjacent elements to compare parity. We return true.
 *
 * 2. We iterate through each element and check if the current element is even, and if the next element is even as well.
 * - 2.1: If both current element and next element are the same (both true or both false). It means the current and next elements have the same parity (both even or both odd), violating the condition for a "special" array.
 * - 2.2: In this case, we return `false` because the array is not special.
 *
 * 3. Otherwise, we return true after iterating all the elements.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn is_array_special(nums: Vec<i32>) -> bool {
        if nums.len() <= 1 {
            return true;
        }

        for i in 1..nums.len() {
            let is_current_even = nums[i] % 2 == 0;
            let is_previous_even = nums[i - 1] % 2 == 0;

            if is_current_even == is_previous_even {
                return false;
            }
        }

        true
    }
}

/**
 * Same approach but instead of using Math to calculate the even or ood number, we're using the XOR operator
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn is_array_special(nums: Vec<i32>) -> bool {
        if nums.len() <= 1 {
            return true;
        }

        for i in 1..nums.len() {
            if (nums[i - 1] ^ nums[i]) % 2 == 0 {
                return false;
            }
        }

        true
    }
}
