/**
 * https://leetcode.com/problems/unique-paths-ii/description/
 *
 * Bottom-Up DP Approach
 *
 * 1. The base cases: We check for two base cases where there can be no paths. If the starting cell (obstacleGrid[0][0]) or the ending cell (obstacleGrid[rows - 1][cols - 1]) is an obstacle (1), we return `0` as there are no valid paths.
 *
 * 2. We create a 2D array `grid` with dimensions `rows x cols` which will be used to store the number of unique paths reaching each cell.
 *
 * 3. We iterate through each row and column of the grid.
 *
 * 4. Inside the loop we check, if the current cell is an obstacle (1), we skip to the next cell as there's no path through obstacles.
 *
 * 5. There are 4 scenarios to explore here:
 * - 5.1: The base case: If it's the starting cell (top-left corner), there's only one unique path (staying there), so we set the current row and column to 1.
 *
 * - 5.2: The first row: For any cell in the first row (except the starting cell), the only way to reach it is from the previous cell in the same row. So, we set the current row and column to the value of the current row and previous column (grid[row][col - 1]).
 *
 * - 5.3: The first column: Similar to the first row, for any cell in the first column (except the starting cell), the only way to reach it is from the cell above it in the same column. So, we set the current row and column to the value of the previous row and current column (grid[row - 1][col]).
 *
 * - 5.4: For any other cell (not in the first row or column and not an obstacle), it can be reached by coming from either the cell above it (grid[row - 1][col]) or the cell to the left of it (grid[row][col - 1]). Therefore, the number of unique paths reaching the current cell is the sum of the paths reaching the cell above and the cell to the left. We set the grid[row][col] to grid[row - 1][col] + grid[row][col - 1].
 *
 * 6. After iterating through all cells, the final element (grid[m - 1][n - 1]) in the grid array represents the number of unique paths reaching the ending cell (bottom-right corner). We return the value stored in the bottom-right corner (grid[m - 1][n - 1]).
 *
 * Time complexity: O(m * n), where m is the number of rows in the obstacleGrid and n is the number of columns
 *
 * Space complexity: O(m * n), where n is the number of columns in the obstacleGrid
 *
 */
const uniquePathsWithObstacles = (obstacleGrid) => {
  const rows = obstacleGrid.length;
  const cols = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1 || obstacleGrid[rows - 1][cols - 1] === 1) {
    return 0;
  }

  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (obstacleGrid[row][col] === 1) continue;

      if (row === 0 && col === 0) {
        grid[row][col] = 1;
      } else if (row === 0) {
        grid[row][col] = grid[row][col - 1];
      } else if (col === 0) {
        grid[row][col] = grid[row - 1][col];
      } else {
        grid[row][col] = grid[row - 1][col] + grid[row][col - 1];
      }
    }
  }

  return grid[rows - 1][cols - 1];
};

/**
 * Top-Down DP Approach (Optimized Space Complexity)
 *
 * 1. We check if the starting cell (obstacleGrid[0][0]) or the ending cell (obstacleGrid[rows - 1][cols - 1]) is an obstacle (1), we return 0.
 *
 * 2. Instead of a single 2D array dp, we create two 1D arrays of size `columns` (number of `columns`): currentRow and previousRow. These will be used to store the number of unique paths reaching each column for the current and previous rows.
 *
 * 3. We iterate through each row and column of the grid.
 *
 * 4. Obstacle Check: If the current cell is an obstacle (`1`), we set the corresponding element in grid to 0 because there are no paths through obstacles.
 *
 * 5. There are 4 scenarios to explore here:
 * - 5.1: If it's the first cell in the current row (top-left corner), there's only one unique path (staying there), so we set `currentRow[col]` to 1.
 *
 * - 5.2: For any cell in the first column (except the starting cell), the only way to reach it is from the cell above it in the same column. So, we set the current column (`currentRow[col]`) to the corresponding value in the previous row (`previousRow[col]`). This is because the first column only depends on the previous row for paths.
 *
 * - 5.3: For any other cell (not in the first column and not an obstacle), it can be reached by coming from either the cell above it (previousRow[col]) or the cell to the left of it (currentRow[col - 1]). Therefore, the number of unique paths reaching the current cell is the sum of the paths reaching the cell above (previous row) and the cell to the left (current row). We set currentRow[col] to previousRow[col] + currentRow[col - 1].
 *
 * 6. After processing all cells in the current row, the grid array holds the number of unique paths reaching each column in that row. To prepare for the next row, we swap the roles of currentRow and previousRow.
 *
 * 7. After iterating through all rows, the final element in `previousRow` corresponding to the last column (`previousRow[cols - 1]`) represents the number of unique paths reaching the ending cell. We returns the value stored in `previousRow[cols - 1]`.
 *
 * Time complexity: O(m * n), where m is the number of rows in the obstacleGrid and n is the number of columns
 *
 * Space complexity: O(n), where n is the number of columns in the obstacleGrid
 */
const uniquePathsWithObstacles = (obstacleGrid) => {
  const rows = obstacleGrid.length;
  const cols = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1 || obstacleGrid[rows - 1][cols - 1] === 1) {
    return 0;
  }

  let currentRow = new Array(cols).fill(0);
  let previousRow = new Array(cols).fill(0);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (obstacleGrid[row][col] === 1) {
        currentRow[col] = 0;
      } else if (row === 0 && col === 0) {
        currentRow[col] = 1;
      } else if (row === 0) {
        currentRow[col] = currentRow[col - 1];
      } else if (col === 0) {
        currentRow[col] = previousRow[col];
      } else {
        currentRow[col] = previousRow[col] + currentRow[col - 1];
      }
    }

    [currentRow, previousRow] = [previousRow, currentRow];
  }

  return previousRow[cols - 1];
};
