/**
 * https://leetcode.com/problems/continuous-subarray-sum/description/
 *
 * Hash Table + Prefix Sum Approach
 *
 * Idea: We can notice that when the sum of a subarray is divisible by k, the remainder after dividing the sum by k will always be 0.
 *
 * ```js
 * For example: [23,2,4,6,7], k = 6
 *
 * The qualified subarray in this case is [2, 4] => sum = 6 => remainder = 6 % 6 = 0
 * ```
 *
 * By calculating the remainder (prefix_sum % k) of the current cumulative sum (prefix_sum), we essentially track how close we are to a sum divisible by k
 *
 * Storing the remainder and its corresponding ending index (i) in the visited_remainder map allows us to check if a previous subarray with the same remainder exists.
 *
 * If we encounter a remainder that already exists in the map, it indicates that a previous subarray ending at a certain index also has the same remainder.
 *
 * By subtracting the ending index of the previous subarray with the same remainder from the current index, we can calculate the length of the current subarray that leads to the same remainder.
 *
 * If the current subarray has a length greater than 1 and the remainder is 0 (meaning the cumulative sum is divisible by k), we've found a qualifying subarray.
 *
 * If the current subarray has a length greater than 1 and the remainder from a previous subarray with the same remainder also exists, it implies that the sum of the current subarray combined with the previous subarray would be divisible by k.
 *
 * Implementation:
 *
 * 1. We create a Map called `visited_remainder` to store remainders and their corresponding ending indices in the array. And we initialize a initial key-value pair: {0: -1} to represent in case an subarray (with sum 0). This is used for handling the edge case where the entire array might have a sum divisible by k.
 *
 * 2. We initialize a variable `prefix_sum` to 0 to keep track of the cumulative sum.
 *
 * 3. Inside the loop, we calculate the current sum by adding the current number (nums[i]) to the previous sum. And we then calculate the remainder by performing `prefix_sum % k`. This represents the remainder after dividing the cumulative sum by the target k.
 *
 * 4. We check if the current remainder already exists in the visited_remainder map.
 * - 4.1: If the remainder doesn't exist, this means there isn't a previously encountered subarray with the same remainder. We then set the current remainder as a key with the current index (i) as the value into the visited_remainder map. This stores the ending index of the current subarray that leads to the encountered remainder.
 *
 * - 4.2: If the remainder exists which indicates that a previous subarray ending at index of current remainder also has the same remainder. We calculate the length of the current subarray by subtracting the ending index of the previous subarray with the same remainder from the current index (i).
 *
 * - 4.3: If the current_subarray_length is greater than 1 which means we've found a subarray with a length greater than 1 that has a remainder divisible by k. The sum of this subarray must also be divisible by k. We return true as we found a qualifying subarray.
 *
 * 5. Otherwise, we return false if there is no valid subarray.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 */
use std::collections::HashMap;

impl Solution {
    pub fn check_subarray_sum(nums: Vec<i32>, k: i32) -> bool {
        // This map stores a key as remainder and a value is the end index of current sub-array
        let mut visited_remainder = HashMap::new();
        let mut prefix_sum = 0;

        // Edge case where a subarray has a sum divisible by k
        visited_remainder.insert(0, -1);

        for (i, &num) in nums.iter().enumerate() {
            prefix_sum += num;
            let remainder = prefix_sum % k;

            if let Some(&end_index) = visited_remainder.get(&remainder) {
                let current_subarray_length = i as i32 - end_index;
                if current_subarray_length > 1 {
                    return true;
                }
            } else {
                visited_remainder.insert(remainder, i as i32);
            }
        }

        false
    }
}
