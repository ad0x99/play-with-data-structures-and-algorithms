/**
 * https://leetcode.com/problems/matchsticks-to-square/
 *
 * Recursion & Backtracking Approach
 *
 * 1. We sort the `matchsticks` array in descending order first. This ensures that larger matchsticks are considered first during backtracking, potentially leading to solutions faster.
 *
 * 2. We calculate the total length of all matchsticks and check if the total length is divisible by 4 (because a square has 4 sides). If not, it's impossible to form a square with equal sides. We return false in this case.
 *
 * 3. Next, we calculate the required side length of the square by dividing the total length by 4. This is expected length for each side of the square.
 *
 * 4. We create an array named `currentLength` with 4 elements (representing the four sides of the square being built). These elements are initialized to 0, representing the current length of each side.
 *
 * 5. The base case:
 * - 5.1: We check if all matchsticks have been processed (i reached the end of the matchsticks array).
 * - 5.2: And if all side lengths in `currentLength` are equal to the desired `sideLength`, it means a square is formed. We return `true` (solution found).
 * - 5.2: Otherwise, we return `false` (no solution found yet).
 *
 * 6. Recursive Exploration: We loop through all possible sides (sideIdx = 0 to sideIdx < 4) and check:
 * - 6.1: If adding the current matchstick length (matchsticks[i]) to the current length of side `sideIdx` (currentSum[sideIdx]) doesn't exceed the allowed side length (sideLength).
 * - 6.2: If the condition is met, we update the current length for that side.
 * - 6.3: After that, we make a recursive call to choose(i + 1) to explore if using the next matchstick (i + 1) on any side leads to a solution.
 * - 6.4: If the recursive call (choose(i + 1)) returns true (solution found), it means a complete square is formed using subsequent matchsticks. We return `true` to propagate the success.
 *
 * 7. Backtracking:
 * - 7.1: If no solution is found through trying the current matchstick on any side, we backtrack by resetting the current sum for that side to undo the previous addition.
 * - 7.2: And if no solution is found by trying the current matchstick on any side, we return `false` (no solution found with the current matchstick).
 *
 * Time complexity:  O(4^n) - where n is the length of matchsticks. Because for each matchstick, we have 4 choices (4 sides of the square) and we have to recursively explore all possible combinations.
 *
 * Space complexity: O(log n) + O(1) * O(n) = O(n)
 * - O(log n) for sorting
 * - O(1) for local variables
 * - O(n) because of the recursive calls and the array used to keep track of the current sum for each side.
 *
 */
impl Solution {
    pub fn makesquare(matchsticks: Vec<i32>) -> bool {
        let n = matchsticks.len();

        // Sort matchsticks in descending order
        let mut matchsticks = matchsticks;
        matchsticks.sort_by(|a, b| b.cmp(a)); // Use sort_by for descending order

        // Check if total length is divisible by 4 (side length)
        let total_length: i32 = matchsticks.iter().sum();
        if total_length % 4 != 0 {
            return false;
        }

        // Expected side length to form a square
        let side_length = total_length / 4;
        let mut current_length = vec![0; 4]; // Initialize with zeros

        fn choose(
            i: usize,
            matchsticks: &[i32],
            n: usize,
            side_length: i32,
            current_length: &mut Vec<i32>,
        ) -> bool {
            if i == n {
                // Check if all sides have the same length (sideLength)
                return current_length.iter().all(|side| *side == side_length);
            }

            for side_idx in 0..4 {
                if matchsticks[i] + current_length[side_idx] <= side_length {
                    current_length[side_idx] += matchsticks[i];

                    // Recursive call to try next matchstick
                    if choose(i + 1, matchsticks, n, side_length, current_length) {
                        return true;
                    }

                    current_length[side_idx] -= matchsticks[i];
                }
            }

            return false;
        }

        choose(0, &matchsticks, n, side_length, &mut current_length) // Pass reference to matchsticks for recursion
    }
}

/**
 * Recursion & Backtracking Approach
 *
 * 1. We sort the `matchsticks` array in descending order first. This ensures that larger matchsticks are considered first during backtracking, potentially leading to solutions faster.
 *
 * 2. We calculate the total length of all matchsticks and check if the total length is divisible by 4 (because a square has 4 sides). If not, it's impossible to form a square with equal sides. We return false in this case.
 *
 * 3. Next, we calculate the required side length of the square by dividing the total length by 4. This is expected length for each side of the square.
 *
 * 4. We create an array named `currentLength` with 4 elements (representing the four sides of the square being built). These elements are initialized to 0, representing the current length of each side.
 *
 * 5. We declare a variable `ans` and initializes it to `false`. This variable will be used to track whether a solution is found during backtracking.
 *
 * 6. The base case:
 * - 6.1 We check if all matchsticks have been processed (i reached the end of the matchsticks array).
 * - 6.2: And if all side lengths in `currentLength` are equal to the desired sideLength, it means a square is formed. We set `ans` to `true` to indicate a solution found.
 * - 6.3: We don't explicitly return here, but ans being set to true will influence the return behavior of subsequent calls.
 *
 * 7. Recursive Exploration: We loop through all possible sides (sideIdx = 0 to sideIdx < 4) and check:
 * - 7.1: If adding the current matchstick length (matchsticks[i]) to the current sum of side sideIdx (currentLength[sideIdx]) meets two conditions:
 * - 7.1.1: If adding the matchstick exactly fills the side or if adding the matchstick doesn't exceed the remaining length on that side, considering the shortest remaining matchstick (matchsticks[n - 1]).This check avoids unnecessary backtracking.
 * - 7.2: If either condition is met, we update the current length for that current side
 * - 7.3: And then, we make a recursive call to choose(i + 1) to explore if using the next matchstick (i + 1) on any side leads to a solution.
 * - 7.4: Early Termination: If `ans` has been set to `true` during a previous recursive call (meaning a solution is found), there's no need to continue exploring further branches. We immediately return.
 *
 * 8. Backtracking:
 * - 8.1: If no solution is found through trying the current matchstick on any side, we backtrack by resetting the current sum for that side to undo the previous addition.
 *
 *
 * Time complexity:  O(4^n) - where n is the length of matchsticks. Because for each matchstick, we have 4 choices (4 sides of the square) and we have to recursively explore all possible combinations.
 *
 * Space complexity: O(log n) + O(1) * O(n) = O(n)
 * - O(log n) for sorting
 * - O(1) for local variables
 * - O(n) because of the recursive calls and the array used to keep track of the current sum for each side.
 */
impl Solution {
    pub fn makesquare(matchsticks: Vec<i32>) -> bool {
        let n = matchsticks.len();

        // Sort matchsticks in descending order
        let mut matchsticks = matchsticks;
        matchsticks.sort_by(|a, b| b.cmp(a)); // Use sort_by for descending order

        // Check if total length is divisible by 4 (side length)
        let total_length: i32 = matchsticks.iter().sum();
        if total_length % 4 != 0 {
            return false;
        }

        // Expected side length to form a square
        let side_length = total_length / 4;
        let mut current_length = vec![0; 4]; // Initialize with zeros
        let mut ans = false;

        fn choose(
            i: usize,
            ans: &mut bool,
            matchsticks: &[i32],
            n: usize,
            side_length: i32,
            current_length: &mut Vec<i32>,
        ) {
            if i == n {
                // Check if all sides have the same length (sideLength)
                if current_length.iter().all(|side| *side == side_length) {
                    *ans = true;
                }

                return;
            }

            for side_idx in 0..4 {
                if matchsticks[i] + current_length[side_idx] == side_length
                    || current_length[side_idx] + matchsticks[i] + matchsticks[n - 1] <= side_length
                {
                    current_length[side_idx] += matchsticks[i];

                    // Recursive call to try next matchstick
                    choose(i + 1, ans, matchsticks, n, side_length, current_length);

                    current_length[side_idx] -= matchsticks[i];
                }

                if *ans {
                    return;
                }
            }
        }

        choose(
            0,
            &mut ans,
            &matchsticks,
            n,
            side_length,
            &mut current_length,
        ); // Pass reference to matchsticks for recursion
        ans
    }
}
