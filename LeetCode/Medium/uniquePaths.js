/**
 * https://leetcode.com/problems/unique-paths/description/
 *
 * Bottom-Up DP Approach
 *
 * 1. We create a 2D array `dp` with `m` rows and `n` columns, where each element is initialized to 0. This array will be used to store the number of unique paths reaching each cell.
 *
 * 2. We iterate through the grid using nested loops:
 * - 2.1: The outer loop iterates through each row.
 * - 2.2: The inner loop iterates through each column in the current row.
 *
 * 3. The base cases:
 * - 3.1: If it's the first row (row === 0) or the first column (col === 0), there's only one way to reach that cell (either always moving down for the first column or always moving right for the first row). In these cases, we set dp[row][col] = 1.
 *
 * 4. Dynamic Programming Calculation:
 * - 4.1: For any other cell (not in the first row or column), the number of unique paths to reach that cell is the sum of the number of unique paths to reach the cell above it (dp[row - 1][col]).
 * - 4.2: And the number of unique paths to reach the cell to the left of it (dp[row][col - 1]).
 * - 4.3: This is because the robot can either move down from the cell above or move right from the cell to the left. We calculate this sum and store it in the current cell of the dp table.
 *
 * 5. After filling the `dp` table with the number of unique paths for each cell, we return the value at the bottom-right corner cell (dp[m - 1][n - 1]), which represents the total number of unique paths from the top-left corner to the bottom-right corner.
 *
 * Time complexity: O(m * n)
 *
 * Space complexity: O(m * n)
 */
const uniquePaths = (m, n) => {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row === 0 || col === 0) {
        dp[row][col] = 1;
      } else {
        dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
};

/**
 * The idea is the same as previous solution but with space complexity optimization
 * 
 * 1. We create two arrays of size `n` (number of columns):
 * - 1.1: The dp array is used to store the current row being processed.
 * - 1.2: The dpPrev array is used to store the the previous row's values.
 * 
 * 2. We iterate through the grid using nested loops:
 * - 2.1: The outer loop iterates through each row.
 * - 2.2: The inner loop iterates through each column in the current row.
 * 
 * 3. Inside the loops, we set base cases similar to the previous approach:
 * - 3.1: If it's the first row (row === 0), there's only one way to reach any cell (always moving down). We set `dp[col] = 1` for all columns in this case.
 * 
 * 4. Dynamic Programming Calculation with Space Optimization:
 * - 4.1: For any other cell (not in the first row), the number of unique paths (`dp[col]`) is calculated using the previous row's values (`dpPrev`).
 * - 4.2: And the current cell in the previous row (`dpPrev[col]`). This is because the robot can either move down from the cell above (which is `dpPrev[col]`) or move right from the cell to the left (which is no longer needed after calculating dp[col]).
 * - 4.3: The calculation is: `dp[col] = dpPrev[col] + dp[col - 1]`. This is similar to the previous approach, but it avoids storing the entire previous row (dpPrev) for all columns.
 * 
 * 5. Swapping Arrays for Next Row: After calculating the unique paths for the current row (`dp`), we swap the roles of the two arrays. 
 * - 5.1: The `dpPrev` array now holds the values of the previous row (which are no longer needed for the current row calculation).
 * - 5.2: And the `dp` array now becomes the empty array ready to be filled with the unique paths for the next row.
 * 
 * 6. After iterating through all rows, the final `dpPrev` array will contain the unique paths for the last row. We return the value at the last column (`dpPrev[n - 1]`), which represents the total number of unique paths from the top-left corner to the bottom-right corner.
 * 
 * 
 * Time complexity: O(m * n)
 *
 * Space complexity: O(n)
 */
const uniquePaths = (m, n) => {
  let dp = new Array(n).fill(0);
  let dpPrev = new Array(n).fill(0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row === 0 || col === 0) {
        dp[col] = 1;
      } else {
        dp[col] = dpPrev[col] + dp[col - 1];
      }
    }

    [dp, dpPrev] = [dpPrev, dp];
  }

  return dpPrev[n - 1];
};
