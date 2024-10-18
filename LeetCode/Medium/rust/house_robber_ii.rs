/**
 * https://leetcode.com/problems/house-robber-ii/description/
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * Because all houses at this place are arranged in a circle, based on the houseRobber problem, there are 2 range of houses we can go with.
 *
 * - We will find the maximum amount the robber can steal from the first house to the second last house
 * - And we will find the maximum amount the robber can steal from the second house to the last house
 *
 * This approach will make sure we're not robbing the two adjacent houses.
 *
 * 1. We create a `dp` array of size `n`. This array will be used to store the maximum amount of money the robber can steal considering houses up to a certain index.
 *
 * 2. The base case:
 * - 2.1: We initialize the first index as `0`. This represents the maximum amount the robber can steal if there's only one house (the first one).
 *
 * - 2.2: We initialize the second index as the second element from the `nums` array. This represents the maximum amount the robber can steal if there are two houses. It considers either robbing the first house only (`nums[0]`) or robbing the second house only (`nums[1]`) and takes the larger amount.
 *
 * 3. We iterate through each house and fill the maximum number of money we can steal at each house.
 *
 * 4. There are 2 scenarios here:
 * - 4.1: Option 1: Rob the current house (`nums[i]`) and consider the maximum amount possible by not robbing the previous house (`dp[i - 2]`). This is because the robber cannot rob consecutive houses.
 *
 * - 4.2: Option 2: Rob the previous house (`dp[i - 1]`). This will skip the current house.
 *
 * - 4.3: We compare these two options and store the maximum value in the current element `dp[i]`. This `dp[i]` now represents the overall maximum amount the robber can steal considering houses up to index `i`.
 *
 * 5. We call the robber function to find the maximum amount possible by:
 * - 5.1: Robbing houses excluding the last house (from the first to the second last house)
 * - 5.2: Robbing houses excluding the last house (from the first to the last house)
 *
 * 6. After iterating through all houses, we compare 2 results and get the larger one.
 *
 * Time complexity: O(n), where `n` is the number of houses
 *
 * Space complexity: O(n), where n is the size of dp array.
 *
 */
impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 0 {
            return 0;
        }
        if n == 1 {
            return nums[0];
        }

        fn robber(nums: &[i32]) -> i32 {
            let n = nums.len();
            let mut dp = vec![0; n];

            if n == 0 {
                return 0;
            }
            if n == 1 {
                return nums[0];
            }

            dp[0] = nums[0];
            dp[1] = nums[1].max(nums[0]);

            for i in 2..n {
                dp[i] = (dp[i - 2] + nums[i]).max(dp[i - 1]);
            }

            dp[n - 1]
        }

        // Rob houses excluding the last house
        let rob_house_line1 = robber(&nums[0..n - 1]);
        // Rob houses excluding the first house
        let rob_house_line2 = robber(&nums[1..n]);

        rob_house_line1.max(rob_house_line2)
    }
}

/**
 * Optimized Space Complexity
 *
 * Instead of using a full array to store the intermediate results, we can use two variables to keep track of the maximum profit up to the previous house and the house before the previous house.
 *
 * This approach utilizes the fact that we only need the last two computed values at any point in time.
 *
 * Time complexity: O(n), where `n` is the number of houses
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();

        if n == 0 {
            return 0;
        }
        if n == 1 {
            return nums[0];
        }

        fn robber(nums: &[i32]) -> i32 {
            let mut prev1 = 0;
            let mut prev2 = 0;

            for &num in nums {
                let current = (prev1 + num).max(prev2);
                prev1 = prev2;
                prev2 = current;
            }

            prev2
        }

        // Rob houses excluding the last house
        let rob_house_line1 = robber(&nums[0..n - 1]);
        // Rob houses excluding the first house
        let rob_house_line2 = robber(&nums[1..n]);

        rob_house_line1.max(rob_house_line2)
    }
}
