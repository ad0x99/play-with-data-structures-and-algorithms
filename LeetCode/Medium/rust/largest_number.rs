/**
 * https://leetcode.com/problems/largest-number/description/
 *
 * Sorting Approach
 *
 * Idea: We will convert a list of numbers into a list of strings. And perform comparison of concatenation between each string of number to get the larger one.
 *
 * 1. We iterate though the list, convert each number into string.
 *
 * 2. We call the sort function with custom comparison condition.
 *
 * - 2.1: We concatenate the two strings in both orders to create two new strings.
 *
 * - 2.2: We then compare these two concatenated strings. If `a + b` is greater than `b + a`, it means the first number followed by the second number creates a larger number, we move the first number ahead in the sorting order. Otherwise, if `b + a` is greater, it means the second number followed by the first number creates a larger number. In this case, we move the second number ahead.
 *
 * 4. After sorting, the nums array will contain the strings representing the original numbers in a specific order determined by the compare function.
 *
 * - 4.1: We will reverse the array to make the array in descending order.
 *
 * - 4.2: We remove any leading zeros to ensure that the largest number doesn't start with unnecessary zeros.
 *
 * - 4.1: Finally, we will join all the strings in the sorted nums to create a single string representing the largest number.
 *
 * Time complexity: O(n) + O(log) * O(n) = O(n log n), where n is the number of elements in the nums array
 *
 * Space complexity: O(n), where n is the number of elements in the nums array
 */
impl Solution {
    pub fn largest_number(nums: Vec<i32>) -> String {
        let mut nums_str = nums
            .iter()
            .map(|num| num.to_string())
            .collect::<Vec<String>>();

        nums_str.sort_by(|a, b| {
            let combined_ab = format!("{}{}", a, b);
            let combined_ba = format!("{}{}", b, a);
            combined_ab.cmp(&combined_ba)
        });

        nums_str.reverse();
        if nums_str[0] == "0" {
            return "0".to_string();
        }
        nums_str.join("")
    }
}
