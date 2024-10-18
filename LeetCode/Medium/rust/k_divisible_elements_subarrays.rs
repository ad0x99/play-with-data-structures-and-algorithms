/**
 * https://leetcode.com/problems/k-divisible-elements-subarrays/description/
 *
 * Brute Force Approach
 *
 * Idea: We will find all the potential unique subarrays of the nums by using a Set to keep the unique subarrays.
 *
 * When building the subarray, we will remove all the invalid subarrays which have number of elements that divisible by p are greater than k.
 *
 * But when using the Set to store unique subarray, the Set can't store unique subarray, therefore, we're going to convert the subarray into a string format, then we store into the Set.
 *
 * Implementation
 *
 * 1. We initialize a `unique_subarray` Set to store unique sub-arrays encountered based on their string representation (elements joined by '-'). We use Set to avoid duplicate subarray.
 *
 * 2. We iterate through the array twice.
 *
 * 3. The outer loop (i) iterates from the beginning (i = 0) to the end (i < nums.length) of the array, defining the starting point of the subarray. And the inner loop (j) iterates from the current i (starting point) to the end (j < nums.length) of the array, defining the ending point of the subarray.
 *
 * 4. At each iteration, we check if we found a number is divisible by p, we increment the count by one to keep track how many number of elements that divisible by p.
 *
 * 5. In the next condition, we check if the count is greater than k (meaning the subarray already has more than k elements divisible by p), we break the inner loop to skip the current subarray, since the current subarray is not a valid one.
 *
 * 6. To store the unique subarray, we will convert the subarray into a string and join all element with a hyphen ("-"). This transforms the subarray into a unique string that will be added to the Set for preventing duplication.
 *
 * 7. After iterating through all possible sub-arrays, we return the size of the `unique_subarray` set, which represents the total count of valid distinct sub-arrays.
 *
 * Time complexity: O(n ^ 2), where n is the length of nums.
 *
 * Space complexity: O(n), where n is the length of unique_subarray Set.
 */
use std::collections::HashSet;
impl Solution {
    pub fn count_distinct(nums: Vec<i32>, k: i32, p: i32) -> i32 {
        let mut unique_subarray = HashSet::new();

        for i in 0..nums.len() {
            let mut count = 0;

            for j in i..nums.len() {
                if nums[j] % p == 0 {
                    count += 1;
                }
                if count > k {
                    break;
                }

                let array = &nums[i..=j];
                if !array.is_empty() {
                    unique_subarray.insert(
                        array
                            .iter()
                            .map(|x| x.to_string())
                            .collect::<Vec<_>>()
                            .join("-"),
                    );
                }
            }
        }

        unique_subarray.len() as i32
    }
}
