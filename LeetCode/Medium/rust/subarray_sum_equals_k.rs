/**
 * https://leetcode.com/problems/subarray-sum-equals-k/description/
 *
 * Brute Force Approach
 *
 * Time complexity: O(n ^ 2)
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        let mut count = 0;

        for i in 0..nums.len() {
            let mut current_sum = 0;

            for j in i..nums.len() {
                current_sum += nums[j];

                if current_sum == k {
                    count += 1;
                }
            }
        }

        count
    }
}

/**
 * Hash Table + Prefix Sum Approach
 *
 * 1. We create a Map named `seen` to store prefix sums encountered so far and their frequencies. We initialize seen with a initial key-value pair: {0: 1} to represent that an empty subarray (summing to 0) has a frequency of 1.
 *
 * 2. We initialize a variable `prefixSum` to 0 to keep track of the cumulative sum.
 *
 * 3. Inside the loop, we calculate the current prefixSum by adding the current number (`nums[i]`) to the previous sum. After that, we calculate the complement which is the difference between the `prefixSum` and the target sum `k`. This represents the sum of a subarray that, when added to the complement, would reach the target sum k.
 *
 * 4. We check if the complement exists in the seen map, that means there is a subarray seen earlier with a sum equal to the complement.
 * - 4.1: We retrieve the frequency of the current complement which represents the number of sub-arrays seen so far that have a sum equal to complement.
 *
 * - 4.2: We increment the count by the retrieved frequency to count the number of contributing sub-arrays that can be formed by adding these previously encountered sub-arrays with sum complement to reach the target sum k.
 *
 * 5. In the next condition, we check if the current `prefixSum` already exists in the seen map.
 * - 5.1: If prefixSum doesn't exist, this means this is the first time the current cumulative sum is encountered. We then set the frequency of the prefixSum to 1. This keeps track of how many times the current cumulative sum has been encountered so far.
 *
 * - 5.2: Otherwise, If prefixSum already exists, this means the current cumulative sum has been encountered previously. We retrieve the existing frequency of the prefixSum and increment the frequency by 1 and update the value in seen for the current prefixSum to keep track of the increasing occurrences of the same cumulative sum.
 *
 * 6. After iterating through all numbers, the count variable holds the total number of sub-arrays that add up to the target sum k. We return this count.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(n), where n is the number of elements in the seen Map.
 */
use std::collections::HashMap;
impl Solution {
    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        let mut seen = HashMap::new();
        let mut prefix_sum = 0;
        let mut count = 0;

        seen.insert(0, 1);

        for num in nums {
            prefix_sum += num;
            let complement = prefix_sum - k;

            if let Some(&value) = seen.get(&complement) {
                count += value
            }

            let entry = seen.entry(prefix_sum).or_insert(0);
            *entry += 1
        }

        count
    }
}
