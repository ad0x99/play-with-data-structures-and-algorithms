/**
 * https://leetcode.com/problems/max-area-of-island/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: An island is made up of connected land cells (represented by 1s) connected 4-directionally (up, down, left, right). We want to find the size of the largest island in the grid.
 *
 * We want to explore all the directions of a cell and calculate the maximum area that a land could be reached.
 *
 * 1. Count the size of island: We will explore all cells connected to the current cell, and count the number of lands in the current island.
 *
 * 2. Keep track max area of island: After processing each island, we compare its area with the maximum area found so far. Update the maximum if the current island’s area is larger.
 *
 * Implementation
 *
 * 1. We create an directions array to store the possible moves (up, down, left, right) from a cell.
 *
 * 2. We create a maxAreaOfIsland variable to keep track of the maximum area of an island found.
 *
 * 3. The BFS function:
 * - 3.1: We initialize a queue with the starting cell and mark the current cell as 0 on the grid to indicate that it has been visited.
 *
 * - 3.2: We create a area to keep track the current island's max areas.
 *
 * - 3.3: As long as the queue is not empty, we keep iterating.
 *
 * - 3.4: In each iteration, we dequeue the front cell from the queue representing the current cell to be processed, and increment the area count each time we visit a land.
 *
 * - 3.5: Exploring Adjacent Cells: We then iterate over all possible directions from the current cell.
 *
 * - 3.6: For each direction, we calculate the new cell coordinates (newRow, newCol), and check if the new cell is within the bounds of the grid, and If the new cell is a land.
 *
 * - 3.7: If both conditions met, we mark it as visited, add it to the queue for further exploration.
 *
 * - 3.8: After exploring all connected land cells (part of the same island), we return the area of the current island.
 *
 * 4. In the main logic, we iterate through each cell of the grid.
 * - 4.1: If the cell is a land, we call the BFS to visit all its surrounding cells.
 *
 * - 4.2: After exploring the surrounding lands of the current cell, we get the maximum area of the current island, we then compare that area with the max area has been found so far and update maxAreaOfIsland with the maximum area found.
 *
 * Time complexity:  O(m * n), where m is the number of rows and n is the number of columns in the grid.
 *
 * Space complexity: O(m * n), which is the maximum size of the queue.
 */
const maxAreaOfIsland = (grid) => {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  let maxAreaOfIsland = 0;

  const bfs = (row, col) => {
    const queue = [[row, col]];

    // Mark as visited
    grid[row][col] = 0;

    // Keep track current island's max areas
    let area = 0;

    while (queue.length) {
      const [row, col] = queue.shift();

      // Increment the area count each time we found a land, the current cell is part of the island, start with area 1
      area += 1;

      // Explore all connected land cells
      for (const [rowOffSet, colOffSet] of directions) {
        const newRow = rowOffSet + row;
        const newCol = colOffSet + col;
        const isCellWithinGridBounds =
          newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;

        // If the new cell is within grid bounds and is a land cell,
        // mark it as visited, add it to the queue
        if (isCellWithinGridBounds && grid[newRow][newCol] === 1) {
          grid[newRow][newCol] = 0;
          queue.push([newRow, newCol]);
        }
      }
    }

    return area;
  };

  // Iterate each row and col of the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If the current cell is a land
      if (grid[row][col] === 1) {
        const currentArea = bfs(row, col);
        maxAreaOfIsland = Math.max(maxAreaOfIsland, currentArea);
      }
    }
  }

  return maxAreaOfIsland;
};

/**
 * Depth-First Search (DFS) Approach
 *
 * The idea is the same as BFS approach.
 *
 * Instead of using BFS to traverse the board, we use DFS traversal.
 *
 * Time complexity: O(m * n), where m is the number of rows and n is the number of columns.
 *
 * Space complexity: O(m * n), due to the call stack if the entire grid is filled with land.
 */
const maxAreaOfIsland = (grid) => {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  let maxAreaOfIsland = 0;

  const dfs = (row, col) => {
    // If the cell is out of bounds
    const isCellOutOfGridBounds =
      row < 0 || row >= rows || col < 0 || col >= cols;

    if (isCellOutOfGridBounds || grid[row][col] === 0) {
      return 0;
    }

    // Mark as visited
    grid[row][col] = 0;

    // Increment the area count each time we found a land, the current cell is part of the island, start with area 1
    let area = 1;

    // Explore all connected land cells
    for (const [rowOffset, colOffset] of directions) {
      area += dfs(row + rowOffset, col + colOffset);
    }

    return area;
  };

  // Iterate each row and col of the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If the current cell is a land
      if (grid[row][col] === 1) {
        const currentArea = dfs(row, col);
        maxAreaOfIsland = Math.max(maxAreaOfIsland, currentArea);
      }
    }
  }

  return maxAreaOfIsland;
};
