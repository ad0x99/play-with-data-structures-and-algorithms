/**
 * https://leetcode.com/problems/shortest-path-in-binary-matrix/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: Our goal is to find the shortest path from the top-left corner to the bottom-right corner of a grid where 0 represents a free cell and 1 represents a blocked cell.
 *
 * We choose the BFS approach because we want to explore all nodes at the same depth (or distance from the start) before moving on to nodes at the next depth level. It means, in the grid, we want to explore all cells at the same row first before moving to the next row.
 *
 * This ensures that the first time BFS reaches the target cell, it is via the shortest path.
 *
 * And by considering all 8 possible directions (including diagonals), we ensure that it does not miss any potential shorter path.
 *
 * Implementation
 *
 * 1. Edge case: If the starting cell (e.g. 1, 0) is blocked, it's impossible to reach the end, so we return -1.
 *
 * 2. We initialize an `directions` array contains all possible directions to move (up, down, left, right, and diagonals).
 *
 * 3. We create a `visited` set keeps track of visited cells and ddd the starting cell (0,0) to the visited set.
 *
 * 4. We create a queue for BFS traversal, storing cells in the format [row, col, distance] amd initialize with the starting cell (0,0) and a distance of 1.
 *
 * 5. BFS: As long as there are cells in the queue, we process each cell.
 * - 5.1: Base case: If the current cell is the bottom-right cell (numRows - 1, numCols - 1), it means we reached the target cell, we then return the current distance as the shortest path.
 *
 * - 5.2: Otherwise, we keep exploring all possible directions of the current cell. For each of the 8 possible directions, we calculate the new cell coordinates.
 *
 * - 5.3: If the direction is within the grid bounds, and if the direction is not blocked (value is 0), and if the direction has not been visited before.
 *
 * - 5.4: If all conditions are met, it means, the new direction is valid. We then add the new direction to the queue with an incremented distance and mark it as visited.
 *
 * 6. Finally, If there's no shortest path is found, we return -1.
 *
 * Time complexity: O(m * n), where m and n are the dimensions of the grid
 *
 * Space complexity: O(m * n), where m and n are the dimensions of the grid
 */
const shortestPathBinaryMatrix = (grid) => {
  // If the starting cell (0,0) is blocked, return -1 as no path is possible
  if (grid[0][0] !== 0) {
    return -1;
  }

  const numRows = grid.length;
  const numCols = grid[0].length;

  // Define all 8 possible directions: up, down, left, right, and the 4 diagonals
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Set to keep track of visited cells
  const visited = new Set();
  visited.add('0,0');

  // Queue for BFS, starting from (0,0) with a distance of 1
  const queue = [[0, 0, 1]]; // [row, col, distance]

  // BFS traversal
  while (queue.length > 0) {
    const [currentRow, currentCol, currentDistance] = queue.shift();

    // Base case: If we have reached the bottom-right cell, return the current distance
    if (currentRow === numRows - 1 && currentCol === numCols - 1) {
      return currentDistance;
    }

    // Explore all 8 possible directions from the current cell
    for (const [rowOffset, colOffset] of directions) {
      const newRow = currentRow + rowOffset;
      const newCol = currentCol + colOffset;
      const isCellWithinGridBounds =
        newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols;

      // Check if the new cell is within the grid bounds,
      // not blocked, and not visited
      if (
        isCellWithinGridBounds &&
        grid[newRow][newCol] === 0 &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        // Mark the new cell as visited and add it to the queue
        visited.add(`${newRow},${newCol}`);
        queue.push([newRow, newCol, currentDistance + 1]);
      }
    }
  }

  // If no path is found, return -1
  return -1;
};
